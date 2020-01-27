const {Schema, model} = require('mongoose')

const transactionSchema = new Schema ({
  userId: {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  cart: [
    {
      name : {
        type : String,
        required: [true, 'Name cannot be empty']
      },
      price : {
        type : Number,
        required: [true, 'Price cannot be empty']
      },
      quantity : {
        type : Number,
        required: [true, 'Quantity cannot be empty']
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: [true, 'Total Price cannot be empty']
  },
  deliverTo: {
    type: String,
    // required: [true, 'Delivery address cannot be empty']
  },
  deliverPrice: {
    type: Number,
    // required: [true, 'Delivery price cannot be empty!']
  },
  status: { 
    type: String,
    default: 'onDelivery'
    // required: [true, 'Status cannot be empty']
  }
},
{
  timestamps: true
})

const Transaction = model('Transaction', transactionSchema)
module.exports = Transaction