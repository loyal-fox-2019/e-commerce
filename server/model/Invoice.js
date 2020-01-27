const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoiceSchema = new Schema({
    TransactionId:[{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'TransactionId must be provided']
    }],
    BuyerId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'BuyerId must be provided']
    },
    SellerId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'SellerId must be provided']
    },
    totalBilled:{
        type: Number,
        required: [true, 'totalBilled must be provided']
    },
    paymentConfirmation:{
        type: String,
        enum: ['confirm', 'notYet'],
        default: 'notYet'
    },
    resiNumber:{
        type: String,
        default: ' '
    },
    deliveryConfirmation:{
        type: String,
        enum: ['confirm', 'notYet'],
        default: 'notYet'
    },
    invoiceStatus:{
        type: String,
        enum: [
            'Waiting for Payment Confirmation',
            'In Progress',
            'Delivering',
            'Waiting for Delivery Confirmation',
            'Complete'
        ],
        default: 'Waiting for Payment Confirmation'
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    }
})

invoiceSchema.pre('findOneAndUpdate', function(next){
    this.getUpdate().updatedAt = new Date()
    next()
})


const Invoice = mongoose.model('Invoice', invoiceSchema)
module.exports = Invoice