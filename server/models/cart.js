'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: {
        type: Number,
        min: [1, 'Amount must be greater than zero']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: false
    }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;