const { verifyToken } = require('../helpers/jwt')

function authentication ( req,res,next ) {
    if( req.headers.token ) {
        let decoded = verifyToken( req.headers.token )
        
        if( decoded.id ) {
            req.decoded = decoded
            next()
        } else throw { name: 'W Token'}
    } else throw { name: 'N Token'}
}

module.exports = { authentication }