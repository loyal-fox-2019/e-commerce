const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const TransactionSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: {
        type: Number,
        require:[true, 'you must enter quatity']
    },
    status: {
        type:Boolean,
        default:false
    },
},{ timestamps : true});

const Model = mongoose.model('Transaction', TransactionSchema)
module.exports = Model