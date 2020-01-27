'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productImage: {
        type: String,
        required: [true, 'Product Image has to be upload']
    },
    brand: {
        type: String,
        required: [true, 'Brand field cannot be empty']
    },
    type: {
        type: String,
        required: [true, 'Type field cannot be empty']
    },
    description: {
        type: String
    },
    stock: {
        type: Number,
        required: [true, 'Stock field cannot be empty']
    },
    price: {
        type: Number,
        required: [true, 'Price field cannot be empty']
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;