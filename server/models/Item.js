"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, "please fill name"]
  },
  description: {
    type: String,
    required: [true, "please fill description"]
  },
  image: {
    type: String,
    required: [true, "please fill image"]
  },
  price: {
    type: Number,
    required: [true, "please fill price"]
  },
  stock: {
    type: Number,
    required: [true, "please fill stock"]
  }
})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item