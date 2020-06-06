const User = require('../models/User')
const jwt = require('jsonwebtoken')

class UserController {
  static isValid(req, res, next){
    const token = req.body.token
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      if (user) {
        User
          .findOne({
            _id: user.userId
          })
          .then(userValid => {
            if (userValid) {
              userValid = JSON.parse(JSON.stringify(userValid))
              delete userValid.password
              res.status(200).json(userValid)
            } else {
              res.status(422).json({
                message: 'User not found'
              })
            }
          })
          .catch(next)
      } else {
        res.status(422).json({
          message: 'token is not valid'
        })
      }
    } else {
      res.status(422).json({
        message: 'token is not found'
      })
    }
  }
}

module.exports = UserController