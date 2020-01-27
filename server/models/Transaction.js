const { Schema, models, model } = require('mongoose')

const transactionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'UserId must be filled out']
  },
  name: {
    type: String,
    required: [true, 'Name must be filled out']
  },
  address: {
    type: String,
    required: [true, 'Address must be filled out']
  },
  city: {
    type: String,
    required: [true, 'City must be filled out']
  },
  cart: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    amount: Number
  }],
  shippingFee: {
    type: Number,
    required: [true, 'Shipping fee must be filled out']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price must be filled out']
  },
  status: {
    type: String,
    enum: ['waiting', 'paid', 'delivered'],
    default: 'waiting'
  }
}, { timestamps: true })

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction