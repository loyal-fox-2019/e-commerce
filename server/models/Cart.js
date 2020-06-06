const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId, ref: 'Product' 
  },
  amount: {
    type: Number,
    required: [true, 'amount is required']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total Price is required']
  },
  costumer: {
    type: Schema.Types.ObjectId, ref: 'User' 
  }
}, {
  timestamps: { 
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
  }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart