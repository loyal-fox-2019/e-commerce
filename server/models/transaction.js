const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      default: 'pending'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, ['Quantity cannot be less than 1']]
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
