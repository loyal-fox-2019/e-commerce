const Invoice = require('../model/Invoice')

class InvoiceController{
    static test(req,res,next)
      {
        res.status(200).json({ status: 'Invoice connected'})
      }

    
    static createInvoice(req,res,next)
      {
          const { TransactionId, totalBilled, SellerId } = req.body
          
          Invoice.create({
              TransactionId, totalBilled, SellerId,
              BuyerId : req.decodedUser._id
          })
          .then(result =>{
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

    
    static findAllInvoiceByOptions(req,res,next)
      {
          let findQuery = {
              $or: [
                { BuyerId : req.decodedUser._id },
                { SellerId : req.decodedUser._id }
                ]
          }
          const keys = Object.keys(req.body)

          if(keys.length > 0){
              keys.forEach(element => {
                  findQuery[element] = req.body[element]
              });
          }
          console.log(`TCL: InvoiceController -> findQuery`, findQuery)

              

          Invoice.find(findQuery)
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