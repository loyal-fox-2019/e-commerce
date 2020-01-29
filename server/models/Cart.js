const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  isCheckout: {
    type: Boolean,
    default: false,
    required: true
  },
  count: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  }
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;