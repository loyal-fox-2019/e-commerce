const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
  },
  stock: {
    type: Number,
    required: [true, 'Item stock is required'],
    min: [0, 'Stock cant be less than 0'],
  },
  image: {
    type: String,
    required: [true, 'Item image is required'],
  },
  price: {
    type: Number,
    required: [true, 'Item price is required'],
    min: [0, 'Item price cant be less than 0'],
  },
})

const item = model('Item', itemSchema)

module.exports = item
