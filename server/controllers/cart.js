const { Cart } = require('../models');

class CartController {
  static create(req, res, next) {
    Cart.create({ ...req.body, ...req.userData })
      .then(cart => {
        res.status(200).json({
          message: 'Create cart SUCCESS!'
        });
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    Cart.find({ ...req.userData })
      .then(carts => {
        if (carts.length === 0) {
          res.status(404);
          throw new Error(`Carts is empty!`);
        } else {
          res.status(200).json({
            message: `Fetch carts data SUCCESS!`,
            data: carts
          });
        }
      })
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    Cart.findOne({ ...req.userData, _id: req.params.cartId })
      .then(cart => {
        if (!cart) {
          res.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          res.status(200).json({
            message: `Fetch single cart data SUCCESS!`,
            data: cart
          });
        }
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    Cart.findOneAndUpdate({ ...req.userData, _id: req.params.cartId })
      .then(cart => {
        if (!cart) {
          req.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          req.status(200).json({
            message: `UPDATE SINGLE CART SUCCESS!`
          });
        }
      })
      .catch(err => next(err));
  }

  static delete(req, res, next) {
    Cart.findOneAndDelete({ ...req.userData, _id: req.params.cartId })
      .then(cart => {
        if (!cart) {
          req.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          req.status(200).json({
            message: `DELETE SINGLE CART SUCCESS!`
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = CartController;
