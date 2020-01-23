const Item = require('../model/Item')

module.exports = (req,res,next)=>{
    console.log(`
        STOCK CHECKING IS RUNNING
        =========================
    `);
    
    const { amount } = req.body
    if(amount == 0)
        next({status:400, message : 'Mininum buying amount is 1'})
        
    
    Item.findOne({
        _id : req.body.itemId
    })
    .then(result=>{
        if(!result)
          throw({status:404, message : 'Item not found'})
        else
          {
              if(result.stock < amount)
                {
                    throw({status: 431, message: 'Buying amount too large'})
                }
              else
                {
                  req.itemBought = result
                  next()
                }
                
          }
    })
    .catch(err=>{
        next(err)
    })



}