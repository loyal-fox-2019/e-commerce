const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    products: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            qty: {
                type: Number
            }
        }
    ],
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart