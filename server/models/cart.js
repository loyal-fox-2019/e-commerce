const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    totalItem: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isCheckout: {
      type: Boolean
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
