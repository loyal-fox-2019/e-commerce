const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken: function(req, res, next) {
        try {
            let decoded = jwt.verify(req.headers.token, process.env.JWT_PRIVATE_KEY)
            // console.log(decoded)
            req.user = decoded.user
            next()
        } catch(err) {
            next(err)
        }
    }
}