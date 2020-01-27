'use strict';

const jwt = require('../helper/jwt');
const User = require('../models/user');
const Product = require('../models/product');

function authenticate(req, res, next) {
    try {
        const user = jwt.checkToken(req.headers.token);
        User.findById(user.id)
            .then((users) => {
                if (users) {
                    req.user = users;
                    next();
                } else {
                    next({
                        status: 404,
                        message: 'user not found'
                    });
                }
            })
            .catch(next);
    } catch (err) {
        next(err);
    }
}

function authorize(req, res, next) {
    try {
        Product.findById(req.params.id).then((data) => {
            if (data.userId == req.user.id) {
                next();
            } else {
                res.status(401).json({
                    messages: 'not authorize'
                });
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { authenticate };