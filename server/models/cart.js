const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    status: {
        type: String
    },
    notes: {
        type: String
    }
});

const cart = mongoose.model('Carts', cartSchema);

module.exports = cart;