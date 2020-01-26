const jwt = require('jsonwebtoken')
const User = require('../models/User')

function userAuthentication(req, res, next) {
   try {
      if(!req.headers || !req.headers.token) throw {
         errorCode: 400,
         message: 'Need authentication token'
      }

      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      // if(req.url.path == '/user/add_to_cart') console.log('')
      
      req.userId = decoded.userId
      next()
   }
   catch (error) {
      next(error)
   }
}

 async function userAuthorization(req, res, next) {
   try {
      // if(!req.params || !req.params.userId) throw {
      //    errorCode: 400,
      //    message: 'This action requires userId in the parameter'
      // }

      const user = await User.findOne({_id: req.userId})

      if(!user) throw {
         errorCode: 400,
         message: 'Invalid user id'
      }
      
      // if(JSON.stringify(req.params.userId) != JSON.stringify(req.userId)) throw {
      //    errorCode: 401,
      //    message: 'You are not authorized to perform this action'
      // }
      // if(req.body.name == 'Final Fantasy VII: Remake') console.log('i caught the name')
      next()
   }
   catch (error) {
      next(error)
   }
}

async function adminAuthorization(req, res, next) {
   try {
      const user = await User.findOne({_id: req.userId})

      if(user.userType != 'admin') throw {
         errorCode: 403,
         message: 'This action requires an elevated authorization'
      }

      next()
   }
   catch (error) {
      next(error)
   }
}

module.exports = {
   userAuthentication,
   userAuthorization,
   adminAuthorization
}