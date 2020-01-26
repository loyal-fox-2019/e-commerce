'use strict'

const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { generateToken, verifyToken } = require('../helpers/verifyToken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class userController {
  static login(req, res, next) {
    const { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        if (user) {
          const valid = bcrypt.compareSync(password, user.password)
          if (valid) {
            const token = generateToken({ id: user._id })
            const data = {
              name: user.fullName,
              token
            }
            res.status(200).json(data)
          } else {
            throw ({
              status: 400,
              message: 'Your email/password is wrong'
            })
          }
        } else {
          throw ({
            status: 400,
            message: 'Your email is not registered'
          })
        }
      })
      .catch(next)
  }

  static register(req, res, next) {
    const { fullName, email, password, nationalityId } = req.body
    User
      .create({ fullName, email, password, nationalityId })
      .then(user => {
        const token = generateToken({ id: user._id })
        const data = {
          name: user.fullName,
          token
        }
        res.status(201).json(data)
      })
      .catch(next)
  }

  static ceking(req, res, next) {
    res.status(200).json(req.decoded.id)
  }

  static oauthGoogle(req, res, next) {
    const dataUser = {}
    client
      .verifyIdToken({ idToken: req.body.idToken, audience: process.env.GOOGLE_CLIENT_ID })
      .then((googlePayload) => {
        const { name, email } = googlePayload.getPayload();
        dataUser.name = name
        dataUser.email = email
        return User.findOne({ email })
      })
      .then((user) => {
        if (!user) {
          return User.create({ username: dataUser.name, email: dataUser.email, password: '123456' })
        } else {
          return user
        }
      })
      .then(user => {
        const token = generateToken({ id: user._id })
        const data = {
          name: user.fullName,
          token
        }
        res.status(201).json(data)
      })
      .catch(next);
  }
}

module.exports = userController