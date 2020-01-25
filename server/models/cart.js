const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, 'Product id required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User id required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock required']
    },
    status: {
        type: String,
        required: [true, 'Status required']
    },
    notes: {
        type: String,
        default: ''
    }
});

const cart = mongoose.model('Carts', cartSchema);

module.exports = cart;