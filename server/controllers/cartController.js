const { User, Product } = require("../models")
const createError = require('http-errors')
const axios = require('axios')

class CartController {
  static addToCart(req, res, next) {
    let { productId, amount } = req.body
    if (amount < 1) {
      throw createError(400, 'minimum amount of item is one')
    }
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
        res.status(200).json(user)
      })
      .catch(next)  
  }

  static showCart(req, res, next) {
    User.findById(req.decoded._id)
      .populate('cart.productId')
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

  static fetchCities(req, res, next) {
    axios({
      method: 'get',
        url: 'https://api.rajaongkir.com/starter/city',
        headers: {
          "Access-Control-Allow-Origin": "*",
          key: '2525fa2124f69d435be54d3407c7dbdf'
        }
      })
        .then(({ data }) => {
          res.status(200).json(data.rajaongkir.results)
        })
        .catch(next)
  }

  static getShippingFee(req, res, next) {
    const { destination, weight } = req.body
    axios({
      method: 'post',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {
        "Access-Control-Allow-Origin": "*",
        key: '2525fa2124f69d435be54d3407c7dbdf'
      },
      data: {
        origin: 151,
        destination,
        weight,
        courier: 'jne'
      }
    })
      .then(({ data }) => {
        let shippingFee = 0
        console.log('--------------------')
        for (let service of data.rajaongkir.results[0].costs) {
          if (service.service === 'REG') {
            shippingFee = service.cost[0].value
          } else if (service.service === 'OKE'){
            shippingFee = service.cost[0].value
          }
        }
        res.status(200).json({ shippingFee })
      })
      .catch(next)

  }

  static updateAmount(req, res, next) {
    let amount = Number(req.body.amount)
    let productId = req.params.productId
    User.findById(req.decoded._id)
      .then(user => {
        let hasProduct = user.cart.some(product => product['productId'] == productId)
        if (!hasProduct) {
          throw createError(404, 'Product is not in cart')
        } else {
          for (let product of user.cart) {
            if (product.productId == productId) {
              product.amount = amount
              return user.save({ validateBeforeSave: false })
            }
          }
        }
      })
      .then(user => {
        console.log(user, '!!!!')
        res.status(200).json({ message: 'Successfully updated' })
      })
      .catch(next)
  }
}


module.exports = CartController