const { model, Schema } = require('mongoose')

const transactionSchema = new Schema({
    item_id : {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction