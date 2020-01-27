const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:[true,'Input name']
    },
    image:{
        type:String,
        required:[true,'Input image']
    },
    description: {
        type: String,
        required:[true,'Input description']
    },
    price:{
        type:Number,
        required:[true,'Input price']
    },
    stock:{
        type:Number,
        required:[true,'Input stock']
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product