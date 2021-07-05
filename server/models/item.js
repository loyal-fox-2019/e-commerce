const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item