const User = require('../models/User'),
    { compare } = require('../helpers/encrypt'),
    { generateToken } = require('../helpers/jwt')

class UserController {

  static async register(req, res, next) {
    try {
      let { name, email, password } = req.body
      if (email) { email = email.toLowerCase() }
      let user = await User.create({ name, email, password })
      let token = generateToken({ id: user._id })
      res.status(201).json({name:user.name, token})
    } catch (error) {
      next(error)
    }
  }
  
  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      if (email) { email = email.toLowerCase() }
      let user = await User.findOne({ email })
      if (!user || !compare(password, user.password)) {
        next({ status: 404, message: 'Invalid Email or Password' })
      } else {
        let token = generateToken({ id: user._id })
        res.status(200).json({name:user.name, token})
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController