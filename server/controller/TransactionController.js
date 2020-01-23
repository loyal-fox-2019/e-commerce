const Tx = require('../model/Transaction')
const Item = require('../model/Item')

class TransactionController{
    static test(req,res,next)
      {
          res.status(200).json({ status: 'tx connected '})
      }


    static createTransaction(req,res,next)
      {
          Tx.findOne({
              BuyerId : req.decodedUser._id,
              ItemId : req.itemBought._id,
              status: 'incomplete'
          })
          .then(result=>{
              if(result)
                {
                  req.params.txId = result._id
                  req.body.amount = Number(req.body.amount) + Number(result.amount)
                  req.redirectStatus = true
                  next()
                }
              else
                return Tx.create({
                            ItemId: req.itemBought._id,
                            SellerId: req.itemBought.SellerId,
                            BuyerId: req.decodedUser._id,
                            amount: req.body.amount,
                            price: req.itemBought.price,
                        })
          })
          .then(result=>{
              if(!req.redirectStatus)
                res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

    
    static findOneTransaction(req,res,next)
      {
          Tx.findOne({
              _id : req.params.txId,
          })
          .populate('ItemId')
          .populate('BuyerId', ' -password')
          .populate('SellerId', ' -password')
          .then(result=>{
              if(!result)
                throw({status:404, message:"Resource not found"})

              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static findAllTransactionByBuyerId(req,res,next)
      {
          let queryObj = {
            BuyerId : req.decodedUser._id
          }
          
          if(req.body.status)
            queryObj.status = req.body.status
            console.log(`TCL: TransactionController -> queryObj`, queryObj)


          Tx.find(
              queryObj
          )
          .populate('ItemId')
          .populate('BuyerId', ' -password')
          .populate('SellerId', ' -password')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

    
    static patchUpdateAmount(req,res,next)
      {
          const total = req.itemBought.price * req.body.amount
          Tx.findOneAndUpdate(
              { _id : req.params.txId},
              { amount : req.body.amount,
                total
              },
              { runValidators: true }
          )
          .then(result=>{
              res.status(200).json(result)
          }) 
          .catch(err=>{
              next(err)
          })
      }
      

    static patchUpdateStatus(req,res,next) // gk kepake
      {
          Tx.findOneAndUpdate(
              { _id : req.params.txId },
              { status: req.body.status},
              { runValidators: true}
          )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
      

    static bulkPatchTransactionStatus(req,res,next)
      {
          Tx.updateMany(
            { _id : req.body.TransactionId },
            { 
              status : 'paid',
              updatedAt : new Date()
            }
          )
          .then(result=>{
              console.log(' result @bulkPatchTransactionStatus - TxController \n======================\n', result)
              next()
          })
          .catch(err=>{
              next(err)
          })
      }

    
    static deleteOne(req,res,next)
      {
          Tx.findOneAndDelete({
              _id : req.params.txId
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static incompleteAggregateGroupBySellerId(req,res,next)
      {
        console.log(' \n======================\n', req.decodedUser)
          
          Tx.aggregate([
            { "$match": {
                          "BuyerId" : req.decodedUser._id,
                          "status" : 'incomplete'
                        }
            },
            { "$group" : {
                            _id : {
                                    "status" : "$status",
                                    "SellerId" : "$SellerId"
                                  },
                            "data": { $push: "$$ROOT" },
                            "totalBilled" : { $sum : "$total"}
                          }
            },
            { $lookup: {
                from : 'items',
                localField : 'data.ItemId',
                foreignField : '_id',
                as : 'Item List'
            }},
          ])
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

}

module.exports= TransactionController