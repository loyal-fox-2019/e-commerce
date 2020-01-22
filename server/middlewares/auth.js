const { decodeToken } = require('../helpers/jwt'),
  User = require('../models/user'),
  Product = require('../models/product')

function authenticate(req, res, next) {
  try {
    req.user = decodeToken(req.headers.token)
    User.findById(req.user._id)
      .then(user => {
        if(!user){
          next({status: 400, message: 'Authentication failed'})
          // throw new Error({status: 400, message: 'Authentication failed'})
        } else {
          req.user = user
          next()
        }
      })
  } catch (error) {
    next(error)
  }
}

function authorize(req, res, next) {
  try {
    Product.findById(req.params.id)
      .then(product => {
        if(!product){
          next({status: 404, message: 'id not found'})
        } else if (product.user == req.user.id){
          next()
        } else {
          next({status: 401, message: 'Authorization failed'})
        }
      })
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate, authorize }
