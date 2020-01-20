'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
  cutomerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  delivered: Boolean
});

CheckoutSchema.pre('save', function(next) {
  const checkout = this
  checkout.delivered = false;
  next();
})
const Checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = Checkout;
