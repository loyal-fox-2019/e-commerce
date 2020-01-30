const { model, Schema } = require('mongoose')

const transactionSchema = new Schema({
    item_id : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    }
})

const Transaction = model('Transaction', transactionSchema)

module.exports = Transaction