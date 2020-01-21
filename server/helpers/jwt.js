const jwt = require('jsonwebtoken')

function GenerateToken(payload){
    const token = jwt.sign(payload, 'JWT_SECRET');
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