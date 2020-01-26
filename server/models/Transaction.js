const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
  costumer: {
    type: Schema.Types.ObjectId, ref: 'User' 
  },
  status: {
    type: String,
    enum: ['Pending','Payed', 'Delivering', 'Received'],
  },
  products: {
    type: [],
    required: [true, 'products is required']
  },
  totalPayment: {
    type: Number,
    required: [true, 'Total Payment is required']
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction