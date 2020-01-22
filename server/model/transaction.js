const {model, models, Schema} = require('mongoose');

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id required']
    },
    status: {
        type: String,
        required: [true, 'transaction status required']
    },
    item: {
        seller: {
            type: String,
            required: [true, 'seller name required']
        },
        name: {
            type: String,
            required: [true, 'item name required']
        },
        price: {
            type: Number,
            required: [true, 'item price required']
        },
        description: {type: String},
        amount: {
            type: Number,
            required: [true, 'item amount required'],
            default: 0
        }
    },
    totalPrice: {
        type: Number,
        required: [true, 'totalPaid required'],
        default: 0
    },
    paidType: {
        type: String,
        required: [true, "Paid type required"]
    },
    createdAt: {
        type: Date,
        required: [true, "transaction date required"]
    }
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;

