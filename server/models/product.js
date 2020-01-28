const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name required']
  },
  images: {
    type: [String],
    validate: {
      validator: function (images) {
        return !!images.length;
      },
      message: props => 'Product image required at least 1 image'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price required']
  },
  stock: {
    type: Number,
    default: 0
  },
  seller: {
    required: [true, 'Seller required'],
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
});

const product = mongoose.model('Products', productSchema);

module.exports = product;