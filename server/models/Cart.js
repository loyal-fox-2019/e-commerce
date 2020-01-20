'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', },
  items: [],
  checkout: Boolean,
  delivered: Boolean,
});

CartSchema.pre('save', function(next) {
  const cart = this;
  cart.checkout = false;
  cart.delivered = false;
  next();
})

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
