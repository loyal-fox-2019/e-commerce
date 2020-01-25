const { model, Schema } = require("mongoose");

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  isCheckout: {
    type: String,
    default: false
  }
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
