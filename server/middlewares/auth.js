const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')

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
  }
}