
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {comparePassword} = require('../helpers/bcrypt')

class UserController {
   static async createAdmin(req, res, next) {
      try {
         const user = await User.create({
            email: 'admin@mail.com',
            password: 'asd123',
            userType: 'admin'
         })

         const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)

         res.status(201).json({token})
      }
      catch (error) {
         next(error)
      }
   }

   static async create(req, res, next) {
      try {
         const {email, password} = req.body
         const user = await User.create({email, password})
         const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
         res.status(201).json({token})
      }
      catch (error) {
         next(error)
      }
   }

   static async login(req, res, next) {
      try {
         const {email, password} = req.body
         const user = await User.findOne({email})

         if(!user || !comparePassword(password, user.password)) throw {
            errorCode: 400,
            message: 'Invalid email and password combination'
         }

         const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
         res.status(200).json({token})
      }
      catch (error) {
         next(error)
      }
   }
}

module.exports = UserController