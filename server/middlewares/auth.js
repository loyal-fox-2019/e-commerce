const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')
const Transaction = require('../models/Transaction')

module.exports = {
  async authenticate(req, res, next) {
    try {
      let { id } = verifyToken(req.headers.token)
      let user = await User.findById(id)
      if(user) {
        req.decodedId = id
        next()
      } else {
        next({status: 401, message: 'Authentication failed'})
      }
    } catch (error) {
      next(error)
    }
  },
  async authorizeTransaction(req, res, next) {
    try {
      let transaction = await Transaction.findById(req.params.id)
      if (transaction) {
        if (transaction.userId == req.decodedId) next()
        else next({status: 401, message: 'You are not authorized!'})
      } else {
        next({status: 404, message: 'Transaction is not found!'})
      }
    } catch (error) {
      
    }
  }
}