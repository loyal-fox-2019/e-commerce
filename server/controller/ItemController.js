const Item = require('../model/Item')

class ItemController{
    static test(req,res,next)
      {
         res.status(200).json({ status: 'Item Connected' })
      }

    
    static createItem(req,res,next)
      {
          const { name, description, price, stock } = req.body
          
          let image = ''
          if(req.body.file)
            image = req.body.file

          Item.create({
              name, image, description, price, stock,
              SellerId: req.decodedUser._id
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static findOneItem(req,res,next)
      {
          Item.findOne({
              _id : req.params.itemId
          })
          .populate('SellerId', ' -role -password')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static findAllItem(req,res,next)
      {
          let findQuery = {}
          if( req.body.bulkFind )
            findQuery = {
                _id : req.body.bulkFind
            }
          

          Item.find( findQuery)
          .populate('SellerId', ' -role -password')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static aggregateGroup(req,res,next)
      {
        //   Find all item with name contain "gunting", Group by SellerId
            Item.aggregate([
                { "$match": { "name": /gunting/} },
                { $group: { "_id": { "SellerId" : "$SellerId"} } },
                {
                    "$lookup": {
                        "from": "items",
                        "localField": "_id.SellerId",
                        "foreignField": "SellerId",
                        "as": "Item List"
                    }
                }
            ])
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                next(err)
            })
      }


    static findAllItemBySellerId(req,res,next)
      {
          Item.find({
              SellerId : req.params.sellerId
          })
          .populate('SellerId', ' -role -password') 
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static findFilterItem(req,res,next)
      {
          const key = Object.keys(req.body)
          const query = new RegExp(req.body[key], 'i')
          
          Item.find(
              { [key] : query }
          )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
    

    static patchEditItem(req,res,next) 
      {
          const validKey = ['name', 'desciption', 'stock', 'price']
          const keys = Object.keys(req.body)

          const patchQueryKey = keys.filter(key => validKey.indexOf(key) >= 0 )
          console.log(`TCL: ItemController -> patchQueryKey`, patchQueryKey)
          let patchObj = {}
          patchQueryKey.forEach(element => {
              patchObj[element] = req.body[element]
          });

          if(req.body.file)
            patchObj.image = req.body.file
          console.log(`TCL: ItemController -> patchObj`, patchObj)


          Item.findOneAndUpdate(
            { _id: req.params.itemId },
            patchObj,
            { runValidators:true }
          )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static bulkPatchItemStock(req,res,next)
      {
        const keys = Object.keys(req.txAmountObject)
        let bulkWriteQuery = []
        
        keys.forEach(element => {
            bulkWriteQuery.push({
                updateOne:{
                    "filter" : { "_id" : element},
                    "update" : { $inc : { "stock" : -req.txAmountObject[element] },
                                 $set : { "updatedAt" : new Date()}
                                }
                    // "update" : { "stock" : 100} //dev tools, biar cepet balikin valuenya
                }
            })    
        });
        Item.bulkWrite( bulkWriteQuery )
        .then(result=>{
            console.log(`TCL: ItemController -> result`, result)
            next()
        })
        .catch(err=>{
            next(err)
        })

        


      }

    
    static deleteOneItem(req,res,next)
      {
          Item.findOneAndDelete({
              _id : req.params.itemId
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

}

module.exports = ItemController