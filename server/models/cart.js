const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema ({
        userId : {
            type: Schema.Types.ObjectId
        },
        productList : [{
            productId : {
                type: Schema.Types.ObjectId
            },
            qty : {
                type : Number
            }
        }]
})

const cart = mongoose.model('Carts', cartSchema)

module.exports = cart