'use strict'

module.exports = function(err, req, res, next){
    console.log(err.name)
    console.log(err.message)
    
    let code, msg
    switch (err.name) {
        case "ValidationError":
            code= 401,
            msg= err.message
            break;
    
        default:
            code= err.status || 500
            msg= err.message
            break;
    }

    res.status(code).json(msg)
}