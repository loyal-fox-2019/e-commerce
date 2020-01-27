'use strict';

const User = require('../models/user');
const jwt = require('../helper/jwt');

function authorization(req, res, next) {
    const payload = jwt.verifyToken(req.headers.token);
    User.findOne({_id: payload.id})
    .then(user => {
        if(user.userType === 'admin') {
            next();
        } else {
            throw ({status: 403, message: 'Access denied, you dont have permission to access this page'});
        }
    })
    .catch(error => {
        res.status(error.status).json({
            message: error.message
        })
    })
}

module.exports = authorization;