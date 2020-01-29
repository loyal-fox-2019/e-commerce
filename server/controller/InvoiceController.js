const Invoice = require('../model/Invoice')

class InvoiceController{
    static test(req,res,next)
      {
        res.status(200).json({ status: 'Invoice connected'})
      }

    
    static createInvoice(req,res,next)
      {
          const { TransactionId, totalBilled, SellerId } = req.body
          console.log('=========================================\n')
          console.log(`TCL: InvoiceController -> req.body`, req.body)
          
          Invoice.create({
              TransactionId, totalBilled, SellerId,
              BuyerId : req.decodedUser._id,
              createdAt : new Date(),
              updatedAt : new Date()
          })
          .then(result =>{
              console.log(`TCL: InvoiceController -> result`, result)
              res.status(200).json(result)
          })
          .catch(err =>{
              next(err)
          })
      }

    
    static findOneInvoice(req,res,next)
      {
          res.status(200).json(req.invoiceFindResult)
      }

    
    // static findAllCompleteInvoices(req,res,next)
    //   {
    //       // let findQuery = {
    //       //     $or: [
    //       //       { BuyerId : req.decodedUser._id },
    //       //       { SellerId : req.decodedUser._id }
    //       //       ]
    //       // }
    //       let findQuery = { invoiceStatus : 'Complete'}

    //       const keys = ['BuyerId', 'SellerId']
    //       keys.forEach(element => {
    //           if(req.body[element])
    //             findQuery[element] = req.body[element]
    //       });
    //       console.log(`TCL: InvoiceController -> findQuery`, findQuery)

    //       Invoice.find(findQuery)
    //       .populate('SellerId', 'username')
    //       .populate('BuyerId', 'username')
    //       .then(result=>{
    //           res.status(200).json(result)
    //       })
    //       .catch(err=>{
    //           next(err)
    //       })
    //   }

    static findAllConditionedInvoices(req,res,next)
      {
          // let findQuery = { 
          //   invoiceStatus : { $ne: 'Complete'},
          // }
          console.log(`TCL: InvoiceController -> req.body`, req.body)

          let findQuery = {}
          if(req.body.invoiceStatus === 'Complete')
            findQuery.invoiceStatus = 'Complete'
          else
            findQuery.invoiceStatus = { $ne: 'Complete'}


          const keys = ['BuyerId', 'SellerId']
          keys.forEach(element => {
              if(req.body[element])
                findQuery[element] = req.decodedUser._id
          });
          console.log(`TCL: InvoiceController -> findQuery`, findQuery)


          Invoice.find(findQuery)
          .populate('SellerId', 'username')
          .populate('BuyerId', 'username')
          .populate(
              { path: 'TransactionId', 
                select: 'amount price total',
                populate : { 
                              path : 'ItemId',
                              select : 'name'
                           }
              })
          .then(result=>{
                res.status(200).json(result)
          })
          .catch(err=>{
                next(err)
          })
      }


    static patchUpdateInvoice(req,res,next)
      {
          let updateQuery = {}

          const validKey = [
            'paymentConfirmation',
            'resiNumber',
            'deliveryConfirmation'
          ]

          const key = Object.keys(req.body)
          
          if(validKey.indexOf(key[0]) < 0 || key.length === 0)
              next({status: 400, message:"Bad parameter"})
          else{
              updateQuery[key] = req.body[key]

              if(req.body.paymentConfirmation === 'confirm')
                  updateQuery.invoiceStatus = 'in Progress to Deliver Product'
              else if(req.body.resiNumber)
                  updateQuery.invoiceStatus = 'Delivering, waiting for Delivery Confirmation'
              else if(req.body.deliveryConfirmation === 'confirm')
                  updateQuery.invoiceStatus = 'Complete'


              console.log(`TCL: InvoiceController -> updateQuery`, updateQuery)
      
              Invoice.findOneAndUpdate(
                { _id: req.params.invoiceId },
                updateQuery
              )
              .then(result=>{
                  res.status(200).json(result)
              })
              .catch(err=>{
                  next(err)
              })
          }
      }

    
    static deleteOneInvoice(req,res,next)
      {

      }


}


module.exports = InvoiceController