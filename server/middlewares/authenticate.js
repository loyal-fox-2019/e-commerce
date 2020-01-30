const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.loggedIn = payload
        console.log('ini authenticate', payload)
        next()
    }
    catch(err) {
        res.status(500).json({
            message: 'Token not avalaible',
            err
        })
    }
}