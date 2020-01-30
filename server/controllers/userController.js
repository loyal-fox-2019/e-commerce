const User = require('../models/user')
const { comparePassword } = require('../helpers/hashPassword')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static register(req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'basic'
    }

    User.create(data)
      .then(result => {
        const token = jwt.sign(
          {
            id: result._id,
            name: result.name,
            email: result.email,
            role: result.role
          },
          process.env.JWT_SECRET
        )
        res.status(201).json({
          message: 'Registration Success',
          name: result.name,
          role: result.role,
          token: token
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Please check your data'
        })
      })
  }

  static login(req, res, next) {
    const data = {
      email: req.body.email,
      password: req.body.password
    }

    // console.log(req.body)

    User.findOne({ email: data.email })
      .then(result => {
        console.log(data.email, result)
        if (!result) {
          res.status(404).json({
            message: 'Please register your account first'
          })
        } else {
          const compare = comparePassword(data.password, result.password)
          if (!compare) {
            res.status(400).json({
              message: 'Invalid email or password'
            })
          } else {
            const token = jwt.sign(
              {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role
              },
              process.env.JWT_SECRET
            )
            res.status(200).json({
              message: 'Login success',
              id: result._id,
              name: result.name,
              role: result.role,
              token: token
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal server error'
        })
      })
  }

  static registerAdmin(req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'admin'
    }

    User.create(data)
      .then(result => {
        res.status(201).json({
          message: 'Admin created',
          result
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Please check your data',
          err
        })
      })
  }

  static deleteUser(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then(response => {
        res.status(200).json({
          message: 'User Deleted'
        })
      })
      .catch(err => {
        res.status(404).json({
          message: 'User not found',
          err
        })
      })
  }

  static gSign(req, res, next) {
    console.log('Masuk google')
    let payload = null
    let regData = null
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        regData = {
          name: payload.name,
          email: payload.email,
          password: process.env.DEFAULT_PASS,
          role: 'basic'
        }
        // console.log(payload)
        return User.findOne({ email: regData.email })
      })
      .then(data => {
        if (data === null) {
          return User.create(regData)
        } else {
          let token = jwt.sign(
            {
              id: data._id,
              name: data.name,
              email: data.email,
              role: data.role
            },
            process.env.JWT_SECRET
          )
          res.status(200).json({
            message: 'Login Success',
            token: token,
            id: data._id
          })
        }
      })
      .then(data => {
        let token = jwt.sign(
          {
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
          },
          process.env.JWT_SECRET
        )
        res.status(201).json({
          message: 'Login Success',
          token: token,
          id: data._id
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
}

module.exports = UserController
