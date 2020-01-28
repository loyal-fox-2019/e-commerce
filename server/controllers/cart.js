/* eslint-disable no-unused-vars */
const { Cart } = require('../models');

class CartController {
  static create(req, res, next) {
    Cart.create({ ...req.body, ...req.userData })
      .then(cart => {
        res.status(201).json({
          message: 'Cart has been successfully created!'
        });
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    const { userId } = req.userData;
    Cart.find({ userId })
      .then(carts => {
        if (carts.length === 0) {
          res.status(404);
          throw new Error(`Carts is empty!`);
        } else {
          res.status(200).json({
            message: `All carts are successfully retrieved!`,
            data: carts
          });
        }
      })
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    const { userId } = req.userData;
    Cart.findOne({ userId, _id: req.params.cartId })
      .then(cart => {
        if (!cart) {
          res.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          res.status(200).json({
            message: `Cart is successfully retrieved!`,
            data: cart
          });
        }
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const { userId } = req.userData;
    Cart.findOneAndUpdate({ userId, _id: req.params.cartId }, req.body)
      .then(cart => {
        if (!cart) {
          res.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          res.status(200).json({
            message: `Cart is successfully updated!`
          });
        }
      })
      .catch(err => next(err));
  }

  static delete(req, res, next) {
    const { userId } = req.userData;
    Cart.findOneAndDelete({ userId, _id: req.params.cartId })
      .then(cart => {
        if (!cart) {
          res.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          res.status(200).json({
            message: `Cart is successfully removed!`
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = CartController;
