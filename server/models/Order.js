'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerId: String,
  delivered: Boolean,
  total: Number,
  products: [],
  totalPrice: Number,
}, { timestamps: true });

OrderSchema.pre('save', function(next) {
	const order = this;
	order.delivered = false;
	next();
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
