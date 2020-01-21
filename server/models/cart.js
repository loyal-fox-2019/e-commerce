const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    products:[
    {
        item: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product'
        },
        quantity:{
            type: Number,
        }
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

cartSchema.pre('save', function(next){
    this.products = []
    next()
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart