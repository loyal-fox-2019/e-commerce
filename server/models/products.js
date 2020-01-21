const mongoose = require('mongoose')
const Schema = mongoose.Schema


// name:string<br> description:string<br>  picture:string<br> created_date:date<br> price:integer

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product's name is required"]
    },
    description:{
        type: String,
        required: [true, "Product' description is required"]
    },
    picture:{
        type: String,
        required: [true, "Product's picture is required"]
    },
    price:{
        type: Number,
        required: [true, "Product's price is required"]
    },
    stock:{
        type: Number,
        required: [true, "Product's stock is required"]
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true})


const Product = mongoose.model('Product', productSchema)

module.exports = Product