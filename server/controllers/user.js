const User = require('../models/user'),
  { compare } = require('../helpers/bcrypt'),
  { generateToken } = require('../helpers/jwt')

class UserController {
  static all (req, res, next) {
    User.find()
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next)
  }
  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({email})
      .then(user => {
        if(!user){
          next({status: 400, message: 'invalid email or password'})
        } else if(!compare(password, user.password)){
          next({status: 400, message: 'invalid password or email'})
        } else {
          res.status(200).json({ token: generateToken({ _id: user._id }), username: user.username})
        }
      })
      .catch(next)
  }
  static register (req, res, next) {
    const { username, email, password, profile_pic } = req.body
    User.create({
      username,
      email,
      password,
      profile_pic
    })
      .then(user => {
        res.status(200).json({ token: generateToken({ _id: user._id }), username: user.username})
      })
      .catch(next)
  }
}

module.exports = UserController
