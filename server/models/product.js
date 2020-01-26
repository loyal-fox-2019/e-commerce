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
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: String
    }]
}, {timestamps : true},{versionKey : false});   //timestamps add createdAt, updatedAt fields

productSchema.pre('save',function(next) {
    this.seller = ObjectId(this.seller);
    next();
})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;