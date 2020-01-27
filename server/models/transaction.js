'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    cart: {
        type: Array,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'this field is required']
    },
    status: {
        type: String,
        default: "On Delivery"
    },
    price: {
        type: Number
    },
    address: {
        type: String
    }
}, {
    timestamps: { createdAt: 'created_at' }
})

const transaction = mongoose.model('Transaction', transactionSchema)
module.exports = transaction