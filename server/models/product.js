const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const productSchema = new Schema({    
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
    tags: [{
        type: String
    }]
}, {timestamps : true},{versionKey : false});   //timestamps add createdAt, updatedAt fields

productSchema.pre('save',function(next) {

    next();
})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;