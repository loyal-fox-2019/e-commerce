const Transaction = require('../models/Transaction')
const User = require('../models/User')

class TransactionController {
  static async update(req, res, next) {
    const {status} = req.body
    try {
      let update = await Transaction
        .findByIdAndUpdate(req.params.id, {
          status
        }, {omitUndefined:true, new:true})
        res.status(200).json(update)
    } catch (error) {
      next(error)
    }
  }
  static async getAll(req, res, next) {
    try {
      let filter = {}
      let user = User.findById(req.decodedId)
      if (user.role == 'costumer') {
        filter = {userId: req.decodedId}
      }
      let transaction = await Transaction
        .find(filter)
        .sort({createdAt: -1})
      res.status(200).json(transaction)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TransactionController