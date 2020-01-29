const jwt = require('../helpers/jwt');

module.exports = (req,res,next) => {
    console.log('masuk ke authenticator')
    console.log('token : ' + req.headers.token )
    try{
        let userLoggedIn = jwt.tokenVerifier(req.headers.token)
        console.log('user logged in : '+userLoggedIn)
        req.userLoggedIn = userLoggedIn
        next()
    } catch(err) {
        next(err)
    }

};
