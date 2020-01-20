const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    file: {
        type: String
    },
    stock: {
        type: String,
        required: [true, "Stock is required"]
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product

