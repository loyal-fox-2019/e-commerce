const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const itemSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Please insert item name']
   },

   image: {
      type: String,
      required: [true, 'Please insert item name']
   },

   price: {
      type: Number,
      default: 800000
   },

   description: {
      type: String
   },
   
   stock: {
      type: Number,
      default: 50
   }
})

itemSchema.plugin(timestamp)

const Item = mongoose.model('Item', itemSchema)

module.exports = Item