'use strict'

const User = require('../models/user'),
      Product = require('../models/product'),
      Transaction = require('../models/transaction'),
      { verifyToken } = require('../helpers/jwt')

module.exports = {
  authentication(req, res, next) {
    if (req.headers.hasOwnProperty('access_token')) {
      try {
        req.decoded = verifyToken(req.headers.access_token)
        User.findById(req.decoded.id)
          .then(user => {
            if (user) {
              next()
            } else {
              next({ status: 400, message: 'Invalid access' })
            }
          })
          .catch(next)
      } catch(err) {
        next(err)
      }
    } else {
      next({ status: 401, message: 'You must log in first'})
    }
  },

  authorization(req, res, next) {
    Product.findById(req.params.id)
      .then(product => {
        if (product) {
          if (String(product.seller) === String(req.decoded.id)) {
            next()
          } else {
            next({ status: 403, message: 'Unauthorized process!' })
          }
        } else {
          next({ status: 404, message: 'Product not found!' })
        }
      })
      .catch(next)
  },
  
  adminAuthorization(req, res, next) {
    User.findById(req.decoded.id)
      .then(user => {
        if (user.isAdmin) {
          next()
        } else {
          next({ status: 403, message: 'Unauthorized process!' })
        }
      })
      .catch(next)
  },

  userAuthorization(req, res, next) {
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          if (String(user._id) === String(req.decoded.id)) {
            next()
          } else {
            next({ status: 403, message: 'Unauthorized process!' })
          }
        } else {
          next({ status: 404, message: 'User not found!' })
        }
      })
      .catch(next)
  },

  transactionAuthorization(req, res, next) {
    let admin;
    User.findById(req.decoded.id)
      .then(user => {
        admin = user;
        return Transaction.findById(req.params.id)
      })
      .then(transaction => {
        if (transaction) {
          if (String(transaction.buyer) === String(req.decoded.id) || admin.isAdmin) {
            next()
          } else {
            next({ status: 403, message: 'Unauthorized process!' })
          }
        } else {
          next({ status: 404, message: 'Transaction not found!' })
        }
      })
      .catch(next)
  }
}