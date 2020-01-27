const User = require('../models/user')
const generateToken = require('../helpers/generateToken')
class ControllerUser {
  static register(req, res, next) {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      contact: req.body.contact,
      email: req.body.email,
      password: req.body.password,
      platform: 'normal'
    }
    User.create(newUser)
      .then((user) => {
        const token = generateToken({
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          contact: user.contact,
          email: user.email
        })
        res.status(201).json({
          token: token,
          username: user.username
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static login(req, res, next) {
    let user
    User.findOne({
      $or: [
        {
          username: req.body.target,
          platform: 'normal'
        },
        {
          email: req.body.target,
          platform: 'normal'
        }
      ]
    })
      .then((userData) => {
        user = userData
        if (!userData) {
          res.send(400).json('Username atau email belum terdaftar')
        } else {
          const bcrypt = require('bcrypt')
          return bcrypt.compare(req.body.password, userData.password)
        }
      })
      .then((result) => {
        if (!result) {
          res.status(400).json('Username / email atau password anda salah')
        } else {
          const token = generateToken({
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            contact: user.contact,
            email: user.email
          })
          res.status(200).json({
            token: token,
            username: user.username
          })
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static gSignIn(req, res, next) {
    const { OAuth2Client } = require('google-auth-library')
    const client = new OAuth2Client(process.env.G_CLIENT_ID)
    let payload
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.G_CLIENT_ID
      })
      .then((ticket) => {
        payload = ticket.getPayload()
        return User.findOne({
          email: payload.email,
          platform: 'google'
        })
      })
      .then((user) => {
        if (user) {
          return user
        } else {
          const randomizedUser = require('../helpers/randomizedUser')
          let newUsername = randomizedUser(payload.name)
          let newUser = {
            username: newUsername,
            firstname: payload.given_name,
            lastname: payload.family_name,
            email: payload.email,
            platform: 'google',
            password: process.env.G_SIGN_DEF_PASSWORD
          }
          console.log(newUser)
          return User.create(newUser)
        }
      })
      .then((newUser) => {
        console.log(newUser)
        const token = generateToken({
          id: newUser._id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          username: newUser.username,
          contact: newUser.contact,
          email: newUser.email
        })
        res.status(201).json({
          token: token,
          platform: newUser.platform,
          username: newUser.username
        })
      })
      .catch((err) => {
        // console.log(err);
        next(err)
      })
  }
}

module.exports = ControllerUser
