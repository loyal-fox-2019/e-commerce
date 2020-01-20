const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const transactionSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },

   cart: [{
      item: {
         type: Schema.Types.ObjectId,
         ref: 'Item'
      },

      quantity: {
         type: Number,
         default: 0
      }
   }],

   status: {
      type: String,
      default: 'on_delivery'
   }
})

transactionSchema.plugin(timestamp)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction