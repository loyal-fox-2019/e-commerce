const {model, Schema, Types} = require('mongoose')

const cartSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        required: true
    },
    item_list: {
        type: [Types.ObjectId]
    }
})

const Cart = model('Cart', cartSchema)

module.exports = Cart