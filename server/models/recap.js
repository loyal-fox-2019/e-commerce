const mongoose = require('mongoose')
const Schema = mongoose.Schema

// rekap pembelian
const recapSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Must include userId']
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: [true, 'Item tidak boleh kosong']
  },
  jumlah: {
    type: Number,
    required: [true, 'jumlah tidak boleh kosong']
  },
  tanggal: {
    type: Date,
    required: [true, 'Tanggal harus diisi']
  }
})

module.exports = mongoose.model('Recap', recapSchema)
