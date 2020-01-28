const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    dateCheckedOut: Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total: Number,
    detail: {
        type: Array
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction

