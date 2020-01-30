const User = require('../models/user')
const jwt = require('../helpers/jwt')

module.exports = class {
  static register(req, res, next) {
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      balance: 0
    }
    if (req.body.admin_password) {
      if (req.body.admin_password === process.env.ADMIN_PASSWORD) {
        user.role = 'admin'
      } else {
        next(new Error('Incorrect password for register as admin'))
      }
    }
    User.create(user)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    let user = {
      email: req.body.email,
      password: req.body.password
    }
    // console.log(user);

    User.findOne(user)
      .then(userLogin => {
        let token = jwt.generateToken({
          email: userLogin.email,
          id: userLogin._id
        })
        res.status(200).json({ token: token })
      })
      .catch(err => {
        ;(err.statusCode = 400), (err.message = 'Email or Password is invalid')
        next(err)
      })
  }

  static getUser(req, res, next) {
    try {
      let user = {
        _id: req.body.user._id,
        name: req.body.user.name,
        email: req.body.user.email,
        imageUrl: req.body.user.imageUrl,
        role: req.body.user.role,
        balance: req.body.user.balance
      }
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }

  static logout(req, res, next) {
    res.status(200).json({
      message: 'Successfully logout',
      accountType: req.body.user.accountType
    })
  }
}
