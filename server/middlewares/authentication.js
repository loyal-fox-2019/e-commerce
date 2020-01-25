const verifyToken = require('../helpers/jwt').verifyToken;
const User = require('../models/user');

function authentication(req, res, next) {
    try 
    {
        let payload = verifyToken(req.headers.token)
        User.findById(payload.id)
        .then(user => {
            if(user) 
            {
                req.userInfo = {
                    id: user._id, 
                    username: user.username
                }
                next()
            } 
            else 
            {
                next({ status: 401, message: 'Invalid token' })
            }
        })
        .catch(next)
    }
    catch(err) 
    {
        next({ status: 401, message: err })
    }
}


module.exports = authentication