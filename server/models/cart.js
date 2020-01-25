const {Schema, model} = require('mongoose')
const ObjectId = Schema.Types.ObjectId

const CartSchema = new Schema({
    buyer: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    seller:{
        type: ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending' // pending, paid, delivered
    }
})

const Cart = model('Cart', CartSchema)

module.exports = Cart