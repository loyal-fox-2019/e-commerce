const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    picture: {
        type: String,
    },
    stock: {
        type: Number,
        required: [true, 'stock is required']
    },
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: {createdAt: 'created_at'}})

const Product = mongoose.model('Product', productSchema)

module.exports = Product