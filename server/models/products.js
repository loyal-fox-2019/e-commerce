const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: { type: String },
  description: { type: String },
  price: { type: Number },
  stock: { type: Number },
  thumbnail: { type: String }
});

const Product = model("Product", productSchema);

module.exports = Product;
