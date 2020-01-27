const { User, Transaction, Product } = require('../models')
const createError = require('http-errors')

class TransactionController {
  static addTransaction(req, res, next) {
    const { name, address, city, shippingFee, totalPrice } = req.body
    let mycart = []
    User.findById(req.decoded._id)
      .populate('cart.productId')
      .then(user => {
        mycart = user.cart
        const userId = req.decoded._id
        mycart.forEach(product => {
          if (product.productId.stock - product.amount < 0) {
            throw createError(400, `Sorry we cannot provide the amount of item you requested. We have ${product.productId.stock} amount of items left for ${product.productId.name}.`)
          } else {
            return Product.findByIdAndUpdate(product.productId, {
              stock: product.productId.stock - product.amount
            })
          }
        })
      })
      .then(product => {
        return Transaction.create({
          userId,
          name,
          address,
          city,
          shippingFee,
          totalPrice,
          cart: mycart
        })
      })
      .then(transaction => {
        let trx = transaction
        return User.findByIdAndUpdate(req.decoded._id, {
          $set: { cart: [] }
        })
      })
      .then(user => {
        res.status(201).json(trx)
      })
      .catch(next)
  }
  
  static changeStatus(req, res, next) {
    Transaction.findByIdAndUpdate(req.params.transactionId, {
      status: req.body.status
    }, { new: true })
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static findMyTranscations(req, res, next) {
    Transaction.find({ userId: req.decoded._id })
      .populate('cart.productId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static findAllTransactions(req, res, next) {
    Transaction.find({})
      .populate('cart.productId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }
}

module.exports = TransactionController