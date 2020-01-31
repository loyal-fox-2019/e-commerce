'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name cannot be empty'],
  },
  image: {
    type: String,
    required: [true, 'Product image cannot be empty'],
  },
  wear: {
    type: String,
    required: [true, 'Product wear cannot be empty'],
  },
  stock: {
    type: Number,
    required: [true, 'Product stock cannot be empty'],
  },
  price: {
    type: Number,
    required: [true, 'Product price cannot be empty'],
  },
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;