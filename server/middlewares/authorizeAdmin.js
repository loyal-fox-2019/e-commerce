const { User } = require('../models')

function authorizeAdmin(req, res, next){
  User
    .findById(req.userData._id)
    .then((user) => {
      if (user.username == 'admin'){
        next()
      }
      else {
        throw {errorCode: 401, errorMessage: 'You are not an admin'}
      }
    })
    .catch(next)
}

module.exports = authorizeAdmin