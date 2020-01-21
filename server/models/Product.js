const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product