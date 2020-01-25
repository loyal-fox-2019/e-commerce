const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: 0
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: 0
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product