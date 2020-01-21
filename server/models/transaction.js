const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
