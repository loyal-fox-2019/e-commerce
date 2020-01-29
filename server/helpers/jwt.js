const jwt = require('jsonwebtoken');

function tokenGenerator(payload){
    console.log('masuk tokenGenerator')
    let token = jwt.sign(payload, process.env.JWT_SECRET)
    console.log('token : '+token)
    return token
}

function tokenVerifier(token){
    console.log('masuk tokenVerifier')
    let payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log('payload : '+payload)
    return payload
}

module.exports = {
    tokenGenerator,
    tokenVerifier
};
