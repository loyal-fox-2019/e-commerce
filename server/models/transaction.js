const { Schema, model } = require('mongoose')

const transactionSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: {
    type: Array,
  },
  status: {
    type: String,
    enum: ['pending', 'delivered'],
    default: 'pending',
  },
})

const transaction = model('Transaction', transactionSchema)

module.exports = transaction
