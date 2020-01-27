'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema ({
    ProductId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    UserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date_cart: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    sale_price: {
        type: Number,
        default: 0
    },
    sub_total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'process'
    }
})

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;