const {model, Schema, Types} = require('mongoose')

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    stocks: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user_id: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Item = model('Item', itemSchema)

module.exports = Item