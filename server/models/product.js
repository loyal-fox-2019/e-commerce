const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    productName: {
        type: String
    },
    productImage: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    category: {
        type: String
    }

})

const product = mongoose.model('Products', productSchema)

module.exports = product
