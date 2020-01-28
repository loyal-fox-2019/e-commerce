const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    checkOut: {
        type: Boolean,
        required: true
    },
    timeCheckout: {
        type: Date
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart