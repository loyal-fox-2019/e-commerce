const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { checkPassword } = require('../helpers/bcrypt')

class AuthController{
  static register(req, res, next){
    const form = req.body
    User
      .create({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        role: 'Client'
      })
      .then(user => {
        console.log(user)
        const token = jwt.sign({
          userId: user.id,
          emai: user.email,
          role: user.role,
        }, process.env.JWT_SECRET)

        res.status(200).json({
          token
        })
      })
      .catch(next)
  }

  static login(req, res, next){
    const form = req.body
    User
      .findOne({
        email: form.email
      })
      .then(user => {
        const msg = {
          name: 'ValidationError',
          message: 'email/password incorrect'
        }
        if (user) {
          const isPassword =  checkPassword(form.password, user.password)
          if (isPassword) {
            const token = jwt.sign({
              userId: user.id,
              emai: user.email,
              role: user.role,
            }, process.env.JWT_SECRET)

            res.status(200).json({
              token
            })    
          }else{
            throw msg  
          }
        }else{
          throw msg
        }
      })
      .catch(next)
  }
}
module.exports = AuthController