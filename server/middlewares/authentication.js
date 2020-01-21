const { generateJWT, verifyJWT } = require('../helpers/jwt')

function authenticate(req,res,next){
    try {
        const payload = verifyJWT(req.headers.token)
        req.user = payload
        
        next()
    }
    catch(err){
        res.status(401).json({
            message: 'Authentication fail'
        })
    }
}

module.exports = authenticate