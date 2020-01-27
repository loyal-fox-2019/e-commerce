'use strict'

const Transaction = require('../models/transaction'),
      User = require('../models/user'),
      transactionErr = {status: 404, message: 'Transaction not found'}

module.exports = class TransactionController {
  static findAll(req, res, next) {
    Transaction.find()
      .populate({
        path: 'cart.product',
        model: 'Product'
      })
      .populate('buyer', 'name email image')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Transaction.findById(req.params.id)
      .populate({
        path: 'cart.product',
        model: 'Product'
      })
      .populate('buyer', 'name email image')
      .then(transaction => {
        if (!transaction) {
          next(transactionErr)
        }
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static findByBuyer(req, res, next) {
    Transaction.find({ buyer: req.decoded.id })
      .populate({
        path: 'cart.product',
        model: 'Product'
      })
      .populate('buyer', 'name email image')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static create(req, res, next) {
    if (req.body.courier.toLowerCase() !== 'jne'
      && req.body.courier.toLowerCase() !== 'tiki'
      && req.body.courier.toLowerCase() !== 'pos'
    ) {
      next({ status: 404, message: 'Courier: Please choose one, JNE, TIKI or POS' })   
    }
    let userCart = []
    const { address, courier, delivery_fee } = req.body
    // delivery_fee API
    User.findById(req.decoded.id)
      .then(user => {
        userCart = user.cart
        user.cart = []
        user.save({ validateBeforeSave: false })
      })
      .then(user => {
        return Transaction.create({ cart: userCart, address, courier, delivery_fee, buyer: req.decoded.id })
      })
      .then(transaction => {
        res.status(201).json(transaction)
      })
      .catch(next)
  }

  static adminUpdate(req, res, next) {
    // /:id?status=sent/delivered/recieved
    // if (req.query.status.toLowerCase() !== 'sent'
    //   && req.query.status.toLowerCase() !== 'delivered'
    //   && req.query.status.toLowerCase() !== 'recieved'
    // ) {
    //   next({ status: 404, message: 'Status: Please choose one, sent, delivered or recieved' })
    // }
    Transaction.findByIdAndUpdate(
      req.params.id,
      { status: 'sent' },
      { new: true }
    )
      .then(transaction => {
        if (!transaction) {
          next(transactionErr)
        }
        res.status(200).json(transaction)
      })
      .catch(next)
  }

  static userUpdate(req, res, next) {
    Transaction.findByIdAndUpdate(
      req.params.id,
      { status: 'recieved' },
      { new: true }
    )
      .then(transaction => {
        if (!transaction) {
          next(transactionErr)
        }
        res.status(200).json(transaction)
      })
      .catch(next)
  }
}