'use strict'

const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    cart: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, "Quantity can not be lower than 1"]
      }
    }],
    address: {
      type: String,
      required: [true, 'Address is required']
      // validation
    },
    status: {
      type: String,
      default: 'prepared'
    },
    courier: {
      type: String,
      default: 'JNE',
      required: [true, 'Courier is required']
    },
    delivery_fee: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// TransactionSchema.pre('save', function(next) {
  // this.cart.quantity = parseInt(this.cart.quantity)
  // next()
// })

module.exports = mongoose.model('Transaction', TransactionSchema)