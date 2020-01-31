const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    ItemId:{
        type: Schema.Types.ObjectId,
        ref: "Item"
    },
    SellerId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    BuyerId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    amount:{
        type: Number,
        required: [true, "Amount must be provided"]
    },
    price:{
        type: Number
    },
    total:{
        type: Number
    },
    status:{
        type: String,
        enum: ['paid', 'incomplete'],
        default: 'incomplete'
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


transactionSchema.pre('save', function(){
    this.total = this.amount * this.price
})

transactionSchema.pre('findOneAndUpdate', function(next){
    this.getUpdate().updatedAt = new Date()
    next()
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction