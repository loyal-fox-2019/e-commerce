const jwt = require('jsonwebtoken')

function generateToken(payload, privateKey) {
    return jwt.sign(payload, privateKey)
}

module.exports = {
    generateToken
}