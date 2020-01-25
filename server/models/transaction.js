const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    Buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {
    timestamps: true,
    versionKey: false
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.export = Transaction