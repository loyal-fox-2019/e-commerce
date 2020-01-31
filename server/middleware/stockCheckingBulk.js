const Item = require('../model/Item')
const Tx = require('../model/Transaction')


module.exports = (req,res,next)=>{
    console.log(`
            STOCK CHECKING BULK IS RUNNING
            ==============================
    `);

    const { TransactionId } = req.body

    let txAmountObject = {}
    let itemStockObject = {}

    let itemIdArrayQuery = []



    Tx.find({
        _id : TransactionId
    })
    .then(result=>{
        // console.log(`TCL: result`, result)
        result.forEach(element => {
            txAmountObject[element.ItemId] = element.amount
            itemIdArrayQuery.push(element.ItemId)
        });
        // console.log(`TCL: txAmountObject`, txAmountObject)
        // console.log(`TCL: itemIdArrayQuery`, itemIdArrayQuery)


        return Item.find({
            _id : itemIdArrayQuery
        })
    })
    .then(result=>{
        // console.log(`TCL: result Item.find`, result)
        result.forEach(element => {
            itemStockObject[element.id] = element.stock
        });
        // console.log(`TCL: itemStockObject`, itemStockObject)

        const keys = Object.keys(txAmountObject)
        let validAmountCount = 0
        keys.forEach(element => {
            if(txAmountObject[element] <= itemStockObject[element])
              validAmountCount++
        });
        // console.log(`TCL: validAmountCount`, validAmountCount)
        

        if( validAmountCount === keys.length )
            {
                req.txAmountObject = txAmountObject
                next()
            }
        else
            throw({status:413, message: "Buying amount is too large"})
    })
    .catch(err=>{
        next(err)
    })
}