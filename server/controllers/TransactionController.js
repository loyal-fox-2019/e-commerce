const Transaction = require('../models/Transaction')

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
}

module.exports = TransactionController