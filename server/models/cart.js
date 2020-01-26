const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    totalItem: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isCheckout: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
