const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [1000, 'Minimum price is 1.000'],
    max: [100000000, 'Maximum price is 100.000.000']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [1, 'Minimum stock is 1']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
