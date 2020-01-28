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
                res.status(404).json({
                    msg: "User not found."
                })
            }
        })
        .catch(next)
    }
    catch(err) 
    {
        res.status(401).json({
            msg: "Invalid/missing token."
        })
    }
}


module.exports = authentication