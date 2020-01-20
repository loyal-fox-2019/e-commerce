const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String
    },
    carts: [{
      type: Schema.Types.ObjectId,
      ref: 'Cart'
    }]
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
