const { Schema, models, model } = require('mongoose')

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    amount: Number
  }],
  status: ['waiting', 'paid', 'delivered']
}, { timestamps: true })

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction