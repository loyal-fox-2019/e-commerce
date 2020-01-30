const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  item_id: {
    type: Schema.Types.ObjectId, 
    ref: 'Item',
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  total_price: {
    type: String
  }
})

const Cart = model('Cart', cartSchema)

module.exports = Cart
