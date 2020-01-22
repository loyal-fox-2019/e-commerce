const { User, Product } = require("../models")
const createError = require('http-errors')

class CartController {
  static addToCart(req, res, next) {
    let { productId, amount } = req.body
    amount = Number(amount)
    let cartItem = {
      productId,
      amount
    }
    let person = {}
    User.findById(req.decoded._id)
      .then(user => {
        if (user.cart.length === 0) {
          user.cart.push(cartItem)
        } else {
          for (let product of user.cart) {
            if (product.productId == productId) {
              product.amount += amount
              return user.save({ validateBeforeSave: false })
            }
          }
          user.cart.push(cartItem)
        }
        user.save({ validateBeforeSave: false })
        return user
      })
      .then(user => {
        person = user
        return Product.findByIdAndUpdate(productId, {
          $inc: { stock: -amount }
        }, { new: true })
      })
      .then(product => {
        res.status(200).json(person)
      })
      .catch(next)  
  }

  static showCart(req, res, next) {
    User.findById(req.decoded._id)
      .populate('cart')
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  }

  static removeCartItem(req, res, next) {
    let amount = Number(req.body.amount)
    let productId = req.params.productId
    User.findById(req.decoded._id)
      .then(user => {
        let hasProduct = user.cart.some(product => product['productId'] == productId)
        if (!hasProduct) {
          throw createError(404, 'Product is not in cart')
        } else {
          user.cart = user.cart.filter(product => {
            return product.productId != productId
          })
          user.save({ validateBeforeSave: false})
          return Product.findByIdAndUpdate(productId, {
            $inc: { stock: +amount }
          }, { new: true })
        }
      })
      .then(product => {
        res.status(200).json({ message: 'Successfully deleted' })
      })
      .catch(next)
    }
}


module.exports = CartController