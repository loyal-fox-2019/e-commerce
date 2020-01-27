"use strict"

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name is required']
    },
    image: {
        type: String,
        required: [true, 'product image is required']
    },
    price: {
        type: Number,
        required: [true, 'product price is required']
    },
    stock: {
        type: Number,
        required: [true, 'product stock is required']
    }

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product

