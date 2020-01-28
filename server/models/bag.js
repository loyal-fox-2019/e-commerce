const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bagSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Must include userId']
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: [true, 'Must include productId']
  },
  jumlah: {
    type: Number,
    min: [1, 'Jumlah pembelian minimal 1']
  },
  status: {
    type: Boolean
  }
})

bagSchema.pre('save', function (next) {
  this.status = false
  next()
})

module.exports = mongoose.model('Bags', bagSchema)
