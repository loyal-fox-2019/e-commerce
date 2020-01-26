const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {  
    if (req.headers.hasOwnProperty('token')) {
        const token = req.headers.token
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = user.userId
            req.role = user.role
            next()
        } catch (error) {
            res.status(422).json({
                message: 'token is not valid'
            })
        }
    }else{
        res.status(422).json({
            message: 'token is not found'
        })
    }
}
