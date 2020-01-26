const { Transaction } = require('../models')

function authorizeTransactionOwner(req, res, next){
  Transaction
    .findById(req.params.transactionId)
    .then((transaction) => {
      if (transaction.userId == req.userData._id){
        next()
      }
      else {
        throw {errorCode: 401, errorMessage: 'You are not authorized'}
      }
    })
    .catch(next)
}

module.exports = authorizeTransactionOwner