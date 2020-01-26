const { Transaction } = require("../models");

function transactionAuth(req, res, next) {
  Transaction.findById(req.params.transactionId)
    .then(transaction => {
      if (transaction.userId == req.decoded._id) {
        next();
      } else {
        throw { status: 403, message: "Forbidden access" };
      }
    })
    .catch(next);
}

module.exports = transactionAuth