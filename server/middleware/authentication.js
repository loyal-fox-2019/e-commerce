'use strict';

function authentication(req, res, next) {
    try {
        if(!req.headers.hasOwnProperty('token')) {
            throw ({ statusCode: 403, message: 'Access denied, you have to login first' });
        } else {
            next();
        }
    } catch(error) {
        res.status(error.statusCode).json({
            message: error.message
        })
    }
}

module.exports = authentication;