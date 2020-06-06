const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  image: {
    type: String,
    required: [true, 'image is required']
  },
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  stock: {
    type: Number,
    required: [true, 'stock is required']
  },
  description: {
    type: String
  },
  seller : { 
    type: Schema.Types.ObjectId, ref: 'User' 
  }
}, {
  timestamps: { 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
  }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product