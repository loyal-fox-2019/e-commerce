'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'the field is required']
    },
    price: {
        type: Number,
        min: 1,
        required: [true, 'the field is required']
    },
    stock: {
        type: Number,
        required: [true, 'the field is required'],
        min: 1
    },
    image: {
        type: String,
        required: [true, 'the field is required']
    },
    designer: {
        type: String,
        required: [true, 'the field is required']
    },
    description: {
        type: String,
    },
}, {
    timestamps: { createdAt: 'created_at' }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product