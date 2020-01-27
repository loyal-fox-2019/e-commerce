const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // console.log(req.header)
    if(!req.headers.hasOwnProperty('token')){
        res.status(400).json({err:`You need to login to view this page!`})
    }else{
        try {
            req.loggedUser = jwt.verify(req.headers.token , process.env.NODE_ENV)

            // console.log(req.loggedUser)

            next()

        }
        catch(e){
            res.status(400).json({err:`Invalid token`})
        }
    }
}
