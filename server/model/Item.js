const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoUppercase = require('../helper/autoUppercase')

const itemSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Please Name your item']
    },
    image:{
        type: String
    },
    description:{
        type: String,
        require: [true, 'Describe your item']
    },
    price:{
        type: Number,
        required: [true, 'Describe Price for your item'],
        min: 0
    },
    stock:{
        type: Number,
        required: [true, 'How much item is in stock'],
        min:0
    },
    SellerId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    }
})

itemSchema.pre('save', function(){
    this.name = autoUppercase(this.name, null)
})

itemSchema.pre('findOneAndUpdate', function(next){
    this.getUpdate().updatedAt = new Date()
    next()
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item