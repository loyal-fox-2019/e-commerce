'use strict'

const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  items: [{
    type: Schema.Types.ObjectId, ref: "Product"
  }],
  status: 'String'
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const Cart = model('Cart', cartSchema)

module.exports = Cart