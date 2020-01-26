"use strict"

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    item: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

transactionSchema.pre('save', function (next) {
    this.status = false
    next()
})

const Transaction = mongoose.model("Transaction", transactionSchema)
module.exports = Transaction