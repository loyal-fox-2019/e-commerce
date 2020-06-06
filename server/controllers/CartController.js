const Cart = require('../models/Cart')
const Product = require('../models/Product')
class CartController {
  static create(req, res, next){
    let totalPrice;
    const form = req.body

    Cart
      .findOne({
        product: form.product,
        costumer: req.userId
      })
      .then(cart => {
        if (cart) {
          throw {
            name: 'ValidationError',
            message: 'This product has beed added'
          }
        }else{
          return Product
                      .findOne({
                        _id: form.product,
                      })
        }
      })
      .then(product => {
        totalPrice = form.amount * product.price
        return Cart
                .create({
                  product: form.product,
                  amount: form.amount,
                  totalPrice: totalPrice,
                  costumer: req.userId
                })
      })
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(next)
  }
  static getAll(req, res, next){
    Cart
      .find({
        costumer: req.userId
      })
      .populate('product')
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(next)
  }
  static get(req, res, next){
    Cart
      .findOne({
        _id: req.params.id
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
  static updateAmount(req, res, next){
    let totalPrice;
    Cart
      .findOne({
        _id: req.params.id
      })
      .populate('product')
      .then(cart => {
        if (req.body.amount > cart.product.stock) {
          throw {
            name: 'ErrorValidation',
            message: 'Stock less than amount'
          }
        }
        totalPrice = cart.product.price * req.body.amount
        return Cart
                  .updateOne({ _id: req.params.id }, {
                    amount: req.body.amount,
                    totalPrice: totalPrice
                  })
      })
      .then(result => {
        return Cart.findOne({
                  _id: req.params.id
                })
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
  static delete(req, res, next){
    Cart
      .deleteOne({
        _id: req.params.id
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
  }
}

module.exports = CartController