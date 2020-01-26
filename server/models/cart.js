const { model, Schema } = require("mongoose");

const cartSchema = new Schema({
  ProductId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  UserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  isCheckout: {
    type: Boolean,
    default: false
  }
});

cartSchema.pre("updateMany", function(next) {
  this.find(this.getQuery())
    .then(data => {
      data.forEach(element => {
        model("Product")
          .findById(element.ProductId)
          .then(product => {
            let newStock = product.stock - element.amount;
            model("Product")
              .update({ _id: product._id }, { stock: newStock })
              .then(() => {
                next();
              });
          });
      });
    })
    .catch(err => {
      console.log(err);
    });
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
