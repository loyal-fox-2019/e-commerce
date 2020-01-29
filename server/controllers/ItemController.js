
const Item = require('../models/Item')

class ItemController {
   static async create(req, res, next) {
      try {
         const {name, image, price, stock, description} = req.body
         const item = await Item.create({name, image, price, stock, description})

         res.status(201).json({item})
      }
      catch (error) {
         next(error)
      }
   }

   static async read(req, res, next) {
      try {
         const items = await Item.find()
         res.status(200).json({items})
      }
      catch (error) {
         next(error)
      }
   }

   static async readOne(req, res, next) {
      try {
         const item = await Item.findOne({_id: req.params.id})

         if(!item) throw {
            errorCode: 400,
            message: 'Invalid item id'
         }

         res.status(200).json({item})
      }
      catch (error) {
         next(error)
      }
   }

   static async updateOne(req, res, next) {
      try {
         const inputs = {}
         const {name, image, price, stock, description} = req.body
         
         if(name) inputs.name = name
         if(image) inputs.image = image
         if(price) inputs.price = price
         if(stock) inputs.stock = stock
         if(description) inputs.description = description

         await Item.updateOne(
            {_id: req.params.id},
            {$set: inputs}
         )
         
         const item = await Item.findOne({_id: req.params.id})
         res.status(200).json({item})
      }
      catch (error) {
         next(error)
      }
   }

   static async deleteOne(req, res, next) {
      try {
         const item = await Item.findOneAndDelete({_id: req.params.id})
         res.status(200).json({message: 'Delete item success'})
      }
      catch (error) {
         next(error)
      }
   }
}


module.exports = ItemController