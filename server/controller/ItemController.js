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
              SellerId: req.decodedUser._id,
              createdAt: new Date(),
              updatedAt: new Date()
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
              if(!result)
                throw({ status: 404, message:'Item not Found'})
              else
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

          const { page, view } = req.query
          // bikin req.query nya kosong semua / undefined buat literally find all

          Item.find( 
              findQuery,
            //   null,
            //   { 
            //       skip: (parseInt(page)-1) * parseInt(view),
            //       limit: parseInt(view)
            //   },
          )
          .populate('SellerId', ' -password')
          .sort({ 'createdAt' : -1 } )
          .skip( (parseInt(page)-1) * parseInt(view) )
          .limit( parseInt(view) )
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
          .populate('SellerId', 'username')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
    

    static patchEditItem(req,res,next) 
      {
          const validKey = ['name', 'description', 'stock', 'price']
          const keys = Object.keys(req.body)

          const patchQueryKey = keys.filter(key => validKey.indexOf(key) >= 0 )
        //   console.log(`TCL: ItemController -> patchQueryKey`, patchQueryKey)
          let patchObj = {}
          patchQueryKey.forEach(element => {
              patchObj[element] = req.body[element]
          });
          patchObj.updatedAt = new Date()

          if(req.body.file)
            patchObj.image = req.body.file
        //   console.log(`TCL: ItemController -> patchObj`, patchObj)


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


    static seedingItem(req,res,next)
      {
          let seeding = Item.collection.initializeOrderedBulkOp()
          for(let x = 0; x < 5; x++)
            {
                seeding.insert({
                    name: `Seeded Item - ${x}`,
                    image: 'https://cms.contactmedia.co.za/image/6a6fe5008d2a13a44e86ce43a10b03b3.1200x1200.jpeg',
                    description: `Seeded Description - ${x}`,
                    price: 100000,
                    stock: 100,
                    SellerId: req.decodedUser._id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            }
            console.log(`TCL: seeding`, seeding)
          seeding.execute()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

    
    static countAllItem(req,res,next)
      {
          Item.estimatedDocumentCount()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }

    
    

    //test only
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

}

module.exports = ItemController