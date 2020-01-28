const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    seller: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction