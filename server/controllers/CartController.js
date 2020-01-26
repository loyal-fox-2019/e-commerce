const User = require('../models/User')

class CartController {
  static async getCart(req, res, next) {
    try {
      let cart = await User
        .findById(req.decodedId)
        .populate('cart.productId')
      res.status(200).json(cart)
    } catch (error) {
      next(error)
    }   
  }

  static async add(req, res, next) {
    try {

      let { productId, amount } = req.body
      let result
      amount = Number(amount)

      let user = await User.findById(req.decodedId)
      if (user.cart.length == 0) {
        await user.cart.push({productId, amount})
        result = await user.save({ validateBeforeSave: false })
      } else {
        for (let product of user.cart) {
          if (product.productId == productId) {
            product.amount += amount
            result = await user.save({ validateBeforeSave: false })
            break;
          }
        }
        if (!result) {
          await user.cart.push({productId, amount})
          result = await user.save({ validateBeforeSave: false })
        }
      }
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async checkout(req, res, next) {
    try {
      let user = await User
        .findByIdAndUpdate(
          req.decodedId, 
          {cart: []}, 
          {new:true}
        )
      res.status(200).json(user)      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController