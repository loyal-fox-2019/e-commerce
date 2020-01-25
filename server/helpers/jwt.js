const jwt = require('jsonwebtoken')

function GenerateToken(payload){
    const token = jwt.sign(payload, process.env.JWT_KEY);
    // console.log(token)
    return token
}

function DecodeToken(token){
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded
}

module.exports = {
    GenerateToken,
    DecodeToken
}