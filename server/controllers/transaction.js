/* eslint-disable no-unused-vars */
const { Transaction } = require('../models');

class TransactionController {
  static create(req, res, next) {
    Transaction.create({ ...req.body, ...req.userData })
      .then(transaction => {
        res.status(201).json({
          message: 'Transaction has been successfully created!'
        });
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    const { userId } = req.userData;
    Transaction.find({ userId })
      .then(transactions => {
        if (transactions.length === 0) {
          res.status(404);
          throw new Error(`Transactions is empty!`);
        } else {
          res.status(200).json({
            message: `All transactions are successfully retrieved!`,
            data: transactions
          });
        }
      })
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    const { userId } = req.userData;
    Transaction.findOne({ userId, _id: req.params.transactionId })
      .then(transaction => {
        if (!transaction) {
          res.status(404);
          throw new Error(`Transaction is not found!`);
        } else {
          res.status(200).json({
            message: `Transaction is successfully retrieved!`,
            data: transaction
          });
        }
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    const { userId } = req.userData;
    Transaction.findOneAndUpdate(
      { userId, _id: req.params.transactionId },
      req.body
    )
      .then(transaction => {
        if (!transaction) {
          res.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          res.status(200).json({
            message: `Cart is successfully updated!`
          });
        }
      })
      .catch(err => next(err));
  }

  static delete(req, res, next) {
    const { userId } = req.userData;
    Transaction.findOneAndDelete({ userId, _id: req.params.transactionId })
      .then(transaction => {
        if (!transaction) {
          res.status(404);
          throw new Error(`Cart is not found!`);
        } else {
          res.status(200).json({
            message: `Cart is successfully removed!`
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = TransactionController;
