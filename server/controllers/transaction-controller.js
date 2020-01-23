const Transaction = require('../models/transaction')

class TransactionController {
  static async createTransaction(req, res, next) {
    try {
      const transaction = await Transaction.create({
        buyer: req.body.buyer,
        items: req.body.items,
      })

      res.status(201).json({ message: 'Transaction created' })
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

      console.log(transaction)

      res.json({ message: 'Transaction updated' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TransactionController
