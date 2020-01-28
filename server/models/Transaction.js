const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number
    }
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String
  }
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
