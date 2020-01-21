const {model, Schema, Types} = require('mongoose')

const itemSchema = new Schema({
    name: {
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
    created_date: {
        type: Date,
        required: true
    },
    user_id: {
        type: Types.ObjectId,
        required: true
    }
})

const Item = model('Item', itemSchema)

module.exports = Item