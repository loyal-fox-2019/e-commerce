'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    sale_price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    picture: {
        type: String
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;