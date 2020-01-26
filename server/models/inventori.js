const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventoriSchema = new Schema({
  nama: {
    type: String,
    required: [true, 'Nama produk harus diisi']
  },
  kategori: {
    type: String
  },
  harga: {
    type: Number,
    required: [true, 'Harga tidak boleh kosong']
  },
  stok: {
    type: Number,
    required: [true, 'Stok harus diisi'],
    min: [1, 'Jumlah stok tidak boleh kosong']
  },
  deskripsi: {
    type: String,
    required: [true, 'Deskripsi tidak boleh kosong']
  },
  gambar: {
    type: String,
    required: [true, 'Gambar tidak boleh kosong']
  },
  seller: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Must include userId']
  },
  tanggal: {
    type: Date,
    required: [true, 'tanggal tidak boleh kosong']
  }
})

inventoriSchema.pre('save', function (next) {
  this.tanggal = new Date()
  next()
})

module.exports = mongoose.model('Products', inventoriSchema)
