const jwt = require('../helpers/jwt')
const User = require('../models/user')

module.exports = {
  authentication: function(req, res, next) {
    try {
      const user = jwt.verifyToken(req.headers.token, process.env.JWT_KEY)
      User.findOne({ email: user.email }).then(result => {
        console.log('di auth middleware', result)

        if (result) {
          req.body.user = result
          req.params.user = result
          next()
        } else {
          throw new Error('User not found')
        }
      })
    } catch (error) {
      console.log('langsung dia masuk sini')

      next(error)
    }
  },

  adminOnly: function(req, res, next) {
    let loginUser = req.body.user
    if (loginUser && loginUser.role === 'admin') {
      next()
    } else {
      next(new Error('Not Authorized'))
    }
  }
}
