const Cart = require('../models/cart')
const Item = require('../models/item')
const Transaction = require('../models/transaction')

class CartController {
  static addCart(req, res, next) {
    const data = {
      user_id: req.loggedIn.id,
      item_id: req.body.item_id,
      qty: req.body.qty,
      total_price: req.body.total_price
    }
    console.log(data)

    Item.findById(data.item_id)
      .then(result => {
        if (result.stocks >= 1) {
          return Cart.create(data)
        } else {
          res.status(403).json({
            message: 'Item out of stock'
          })
        }
      })
      .then(data => {
        res.status(201).json({
          message: 'Item added to cart',
          data
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static getCart(req, res, next) {
    Cart.find({ user_id: req.params.id })
      .populate('item_id')
      .then(results => {
        console.log(results)
        res.status(200).json(results)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static deleteCart(req, res, next) {
    Cart.deleteOne({ _id: req.params.id })
      .then(response => {
        res.status(200).json({
          message: 'Data removed'
        })
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static checkoutCart(req, res, next) {
    const data = {
      item_id: req.body.item_id._id,
      user_id: req.loggedIn.id,
      date: new Date()
    }
    let item = null
    Item.findById(data.item_id)
      .then(result => {
        item = result
        if (result.stocks < req.body.qty) {
          res.status(403).json({
            message: 'Sorry, the item are out of stocks'
          })
        } else {
          return Transaction.create(data)
        }
      })
      .then(() => {
        const newStocks = item.stocks - req.body.qty
        return Item.updateOne(
          { _id: data.item_id },
          { $set: { stocks: newStocks } }
        )
      })
      .then(() => {
        return Cart.deleteOne({ _id: req.params.id })
      })
      .then((result) => {
        res.status(201).json({
          message: 'Transaction Success',
          result
        })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static allTransaction(req, res, next) {
    console.log('transaction controller')
    Transaction.find().populate(['user_id', 'item_id'])
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
  }
}

module.exports = CartController
