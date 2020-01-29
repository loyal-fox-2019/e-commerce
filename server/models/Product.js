const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  stock: {
    type: Number,
    min: 0,
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;