const mongoose = require("mongoose")
const { Schema, model, models } = mongoose

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId must be filled out"]
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    amount: {
      type: Number
    }
  }],
  status: {
    type: String,
    enum: ['waiting', 'paid', 'delivered'],
    default: 'waiting'
  }
})

const Cart = model("Cart", cartSchema)

module.exports = Cart