const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    },
    isCheckOut:{
        type: Boolean,
        required: true
    }
})

cartSchema.pre('save', function(next){
    this.products = []
    next()
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart