const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "quantity cannot be less than 1"]
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
