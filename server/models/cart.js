const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    products: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            }
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        validate: {
            validator(owner) {
                return Cart.findOne({
                    owner
                })
                .then(result=>{
                    if(result){
                        return false
                    }
                    else {
                        return true
                    }
                })
            },
            message: 'Email already registered'
        }
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart