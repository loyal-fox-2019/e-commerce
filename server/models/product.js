const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default:
        'http://simagenda.untag-sby.ac.id/uploads/katproduk/default/default-product.jpg',
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    },
    stock: {
      type: Number,
      min: 0,
      max: 999,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model('Product', productSchema)
