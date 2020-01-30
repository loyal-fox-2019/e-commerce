const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    isCheckout: {
      type: Boolean,
      default: false,
      required: true
    },
    count: {
      type: Number,
      min: 0,
      default: 0,
      required: true
    },
    status: {
      type: String,
      default: 'cart',
      required: true
    }
  },
  {
    versionKey: false
  }
)

module.exports = mongoose.model('Transaction', transactionSchema)
