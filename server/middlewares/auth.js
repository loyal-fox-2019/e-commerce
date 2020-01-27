const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user'),
  Product = require('../models/product'),
  Transaction = require('../models/transaction')

function authenticate(req, res, next) {
  try {
    req.user = decodeToken(req.headers.token)
    User.findById(req.user._id)
      .then(user => {
        if(!user){
          let err = new Error('AuthenticationFailed')
          err.status = 400
          err.message = 'Authentication failed'
          throw err
        } else {
          req.user = user
          next()
        }
      })
      .catch(next)
  } catch (error) {
    next(error)
  }
}

function authorize(req, res, next) {
  try {
    Product.findById(req.params.id)
      .then(product => {
        if(!product){
          let err = new Error('NotFound')
          err.status = 404
          err.message = 'id not found'
          throw err
        } else if (product.user == req.user.id){
          next()
        } else {
          let err = new Error('AuthorizationFailed')
          err.status = 401
          err.message = 'Authorization failed'
          throw err
        }
      })
      .catch(next)
  } catch (err) {
    next(err)
  }
}

function authorizeTransaction(req, res, next) {
  try {
    Transaction.findById(req.params.id)
      .then(transaction => {
        if(!transaction){
          let err = new Error('NotFound')
          err.status = 404
          err.message = 'id not found'
          throw err
        } else if (transaction.user == req.user.id){
          next()
        } else {
          let err = new Error('AuthorizationFailed')
          err.status = 401
          err.message = 'Authorization failed'
          throw err
        }
      })
      .catch(next)
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate, authorize, authorizeTransaction }
