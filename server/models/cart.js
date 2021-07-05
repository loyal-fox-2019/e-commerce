const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    item_id: {
        type: Schema.Types.ObjectId, ref: 'Item'
    },
    quantity: {
        type: Number
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart