const Model = require("../models/cart");

class Cart {
  static addCart(req, res, next) {
    Model.create({
      userId: req.loginData.id,
      productId: req.body.productId
    })
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }
  static cartbyUser(req, res, next) {
    Model.find({ userId: req.loginData.id })
      .then(carts => {
        res.status(201).json(carts);
      })
      .catch(next);
  }
  static deleteCart(req, res, next) {
    Model.deleteOne({ id: req.body.id, userId: req.loginData.id });
  }
}
