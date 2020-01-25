const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String
  },
  images: [{
    type: String
  }],
  price: {
    type: Number
  },
  stock: {
    type: Number
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tags'
  }]
});

const product = mongoose.model('Products', productSchema);

module.exports = product;