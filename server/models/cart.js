'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'this field is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'this field is required']
    },
    stock: {
        type: Number,
        required: [true, 'this field is required'],
        min: 1
    }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart