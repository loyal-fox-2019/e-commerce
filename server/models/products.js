const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productName: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    stock: { type: Number },
    image_url: { type: String }
})

const Product = model('Product', productSchema)

module.exports = Product