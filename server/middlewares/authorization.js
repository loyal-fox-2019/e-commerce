'use strict'

const { User } = require('../models')

module.exports = (req, res, next) => {
  User.findOne({
    _id: req.decoded.id
  })
    .then(user => {
      if(user) {
        if(user.email == 'admin@mail.com') {
          next()
        } else {
          throw ({
            status: 401,
            message: 'You are not an admin'
          })
        }
      } else {
        throw ({
          status: 401,
          message: 'You are not an admin'
        })
      }
    })
    .catch(next)
}