const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema ({
        userId : {
            type: Schema.Types.ObjectId
        },
        productId : {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        },
        qty : {
            type : Number
        }
})

const cart = mongoose.model('Carts', cartSchema)

module.exports = cart