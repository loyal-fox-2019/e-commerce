"use strict";

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Product price can not be lower than 1"]
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [1, "Product stock can not be lower than 1"]
    },
    image: {
      type: String,
      required: [true, "Image is required"]
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"]
    },
    description: String,
    category: String,
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProductSchema.pre('save', function(next) {
  this.stock = parseInt(this.stock)
  this.price = parseInt(this.price)
  next()
})

module.exports = mongoose.model("Product", ProductSchema);
