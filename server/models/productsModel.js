const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    Description: {
        type : String,
    },
    imgUrl: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    condition: {
        type : String,
        required : true
    },
    quantity: {
        type : Number,
        required : true
    },
    seller : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
});

// Compile model from schema
var ProductSchema = mongoose.model('Product', ProductSchema );

module.exports = ProductSchema