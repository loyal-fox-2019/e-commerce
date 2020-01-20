const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required'],
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'Item is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Item quantity is required'],
      },
    },
  ],
})
