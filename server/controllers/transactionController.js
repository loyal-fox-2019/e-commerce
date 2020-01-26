const Transaction = require('../models/transaction')
const mongoose = require('mongoose')

module.exports = class {
  static createTransaction(req, res, next) {
    let transaction2create = {
      user: req.body.user._id,
      product: req.params.productId,
      isCheckout: false,
      count: req.body.count
    }
    Transaction.create(transaction2create)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllTransaction(req, res, next) {
    Transaction.find()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static getUserTransaction(req, res, next) {
    console.log(req.body.user._id)

    Transaction.find({
      user: mongoose.Types.ObjectId(req.body.user._id)
    })
      .populate('user')
      .populate('product')
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    let id = req.params.transactionId
    let newTransaction = {
      status: req.body.status
    }
    Transaction.findByIdAndUpdate(id, newTransaction, { new: true })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}
