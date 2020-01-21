const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart