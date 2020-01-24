const jwt = require('jsonwebtoken')

function GenerateToken(payload){
    const token = jwt.sign(payload, 'JWT_SECRET');
    // console.log(token)
    return token
}

function DecodeToken(token){
    const decoded = jwt.verify(token, 'JWT_SECRET');
    return decoded
}

module.exports = {
    GenerateToken,
    DecodeToken
}