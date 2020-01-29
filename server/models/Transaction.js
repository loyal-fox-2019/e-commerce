const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let transactionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  carts: [{
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }],
  total: {
    type: Number,
    required: true
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;