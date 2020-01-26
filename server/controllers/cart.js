const Model = require("../models/cart");

class Cart {
  static addCart(req, res, next) {
    Model.findOne({
      UserId: req.loginData.id,
      isCheckout: false,
      ProductId: req.body.ProductId
    })
      .then(cart => {
        if (cart) {
          let newStock = req.body.amount + cart.amount;
          Model.findByIdAndUpdate(cart._id, { amount: newStock })
            .then(updated => {
              res.status(201).json({ message: "Cart Updated" });
            })
            .catch(next);
        } else {
          Model.create({
            UserId: req.loginData.id,
            ProductId: req.body.ProductId,
            amount: req.body.amount
          })
            .then(created => {
              res.status(201).json(created);
            })
            .catch(next);
        }
      })
      .catch(next);
  }
  static cartbyUser(req, res, next) {
    Model.find({ UserId: req.loginData.id, isCheckout: false })
      .populate("UserId", "full_name")
      .populate("ProductId", ["price", "productName", "thumbnail"])
      .then(carts => {
        res.status(201).json(carts);
      })
      .catch(next);
  }
  static deleteCart(req, res, next) {
    Model.findByIdAndRemove(req.params.id)
      .then(cartItem => {
        if (cartItem) {
          res.status(200).json({ message: "Deleted from Cart" });
        } else {
          err.name = "Not Found";
          err.message = "Item Cannot be found on Cart";
          throw err;
        }
      })
      .catch(next);
  }
  static deleteByUser(req, res, next) {
    Model.deleteMany({ UserId: req.loginData.id })
      .then(() => {
        res.status(200).json({ message: "Deleted All" });
      })
      .catch(next);
  }
  static checkout(req, res, next) {
    Model.updateMany(
      { UserId: req.loginData.id, isCheckout: false },
      { isCheckout: true }
    )
      .then(() => {
        res.status(200).json({ message: "Update change to Checkout" });
      })
      .catch(next);
  }
}

module.exports = Cart;
