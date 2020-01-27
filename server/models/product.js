const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Silahkan masukkan nama produk"]
    },
    stock: {
      type: Number,
      default: 1,
      min: [0, "minimal stock 0"]
    },
    description: {
      type: String,
      minlength: [10, "deskripsi produk minimal 10 karkter"]
    },
    image: {
      type: String,
      default: "https://image.flaticon.com/icons/svg/743/743131.svg"
    },
    category: {
      type: String
    },
    price: {
      type: Number,
      required: [true, "Silahkan masukkan harga produk"],
      min: [100, "minimal harga Rp. 100,-"],
      validate: {
        validator: function(value) {
          if(value % 100 !== 0) {
            return false
          }
        },
        message: props => 'Harga harus kelipatan 100'
      }
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

productSchema.pre('save', function(next) {
  if(this.image == 'null') {
    this.image = "https://image.flaticon.com/icons/svg/743/743131.svg"
  }
  next()
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
