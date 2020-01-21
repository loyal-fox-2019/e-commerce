const { Schema, model, models } = require('mongoose')

const cartSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required'],
    validate: {
      validator: function(val) {
        return models.Cart.findOne({ owner: val }).then(cart => {
          if (cart) return false
          return true
        })
      },
      msg: 'One user can only have one cart',
    },
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
      quantity: {
        type: Number,
      },
    },
  ],
})

const cart = model('Cart', cartSchema)

module.exports = cart
