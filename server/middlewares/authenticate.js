const { User } = require('../models')
const { verify } = require('../helpers/token')

function authenticate(req, res, next){
  try{
    let payload = verify(req.headers.token)
    User
      .findById(payload._id)
      .then((user) => {
        if (user){
          req.userData = payload
          next()
        }
        else {
          throw {errorStatus: 400, errorMessage: 'Invalid Token'}
        }
      })
      .catch(next)
  }
  catch(err){
    next(err)
  }
}

module.exports = authenticate