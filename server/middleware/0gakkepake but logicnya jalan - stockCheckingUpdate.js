const Item = require('../model/Item')
const Tx = require('../model/Transaction')

module.exports = (req,res,next)=>{
    console.log(`
            STOCK CHECKING UPDATE IS RUNNING
            ================================
    `);


    const updateAmount = req.body.buyCount
    let itemStock = 0
    let updateCount = 0

    if(!req.body.itemId)
        throw({ status: 400, message: 'itemId not provided'})

    Item.findOne({
        _id: req.body.itemId
    })
    .then(item=>{
        if(!item)
          throw({status:404, message:"Item has been deleted"})
        else
          {
              itemStock = item.stock
              return Tx.findOne({
                  _id : req.params.txId
              })
          }
    })
    .then(transaction=>{
        updateCount = req.body.buyCount - transaction.amount

        if( Math.abs(updateCount) > itemStock )
            throw({status:413, message:'Buying amount too large'})
        else
          {
            //   console.log(' \n======================\n UDAH SAMPE SINI')
              req.body.buyCount = updateCount
              req.body.updateAmount = updateAmount
              next()
          }
    })
    .catch(err=>{
        next(err)
    })
}