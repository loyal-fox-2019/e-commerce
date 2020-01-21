const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  authenticate: function(req, res, next) {
    if (!req.headers.token) {
      return next({ name: 'BadRequest', message: 'Token is missing' })
    }

    try {
      const token = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      User.findOne({ _id: token.id })
        .then(user => {
          if (!user) {
            throw { name: 'BadRequest', message: 'Bad token' }
          }
          req.payload = token
          next()
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  },
}
