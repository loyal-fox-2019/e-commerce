const Transaction = require('../models/transaction')
const Cart = require('../models/cart')
const Item = require('../models/item')

class TransactionController {
  static getUserTransactions(req, res, next) {
    Transaction.find({ buyer: req.payload.id })
      .then(transactions => {
        res.json({ transactions })
      })
      .catch(next)
  }

  static async createTransaction(req, res, next) {
    let promises = []

    try {
      const cart = await Cart.findOne({ owner: req.payload.id }).populate(
        'items.item',
      )
      const items = cart.items.slice()

      if (items.some(item => item.quantity > item.item.stock)) {
        throw {
          name: 'BadRequest',
          message: 'There is item that stock isnt enough',
        }
      }

      // update stock item
      promises = items.map(item => {
        let id = item.item._id.toString()
        return Item.updateOne(
          { _id: id },
          { stock: item.item.stock - item.quantity },
        )
      })

      await Promise.all(promises)

      // update cart
      cart.items = []
      await cart.save({ validateBeforeSave: false })

      const transaction = await Transaction.create({
        buyer: req.payload.id,
        items,
      })

      res.status(201).json({ transaction })
    } catch (err) {
      next(err)
    }
  }

  static async updateTransaction(req, res, next) {
    try {
      const transaction = await Transaction.findOneAndUpdate(
        { _id: req.params.transactionId, buyer: req.payload.id },
        { status: req.body.status },
      )

      res.json({ message: 'Transaction updated' })
    } catch (err) {
      next(err)
    }
  }

  static deleteTransaction(req, res, next) {
    Transaction.findOneAndDelete({ _id: req.params.transactionId })
      .then(transaction => {
        res.json({ message: 'Transaction deleted' })
      })
      .catch(next)
  }

  static getAllTransactions(req, res, next) {
    Transactions.find({})
      .then(transactions => {
        res.json({ transactions })
      })
      .catch(next)
  }
}

module.exports = TransactionController
