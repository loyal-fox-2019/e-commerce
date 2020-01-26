const { User, Transaction } = require('../models')

class TransactionController {
  static addTransaction(req, res, next) {
    const { name, address, city, shippingFee } = req.body
    let mycart = []
    User.findById(req.decoded._id)
      .then(user => {
        mycart = user.cart
        const userId = req.decoded._id
        return Transaction.create({
          userId,
          name,
          address,
          city,
          shippingFee,
          cart: mycart
        })
      })
      .then(cart => {
        res.status(201).json(cart)
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
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }
}

module.exports = TransactionController