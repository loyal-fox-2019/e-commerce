'use strict';

const { verifyToken } = require('./jwt');
const Product = require('../models/product');
const User = require('../models/user');

function authentication(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
          req.userLoggedIn = verifyToken(req.headers.token);
          User.findById(req.userLoggedIn.id)
            .then(user => {
              if (user) {
                next();
              } else {
                next({ status: 400, message: 'Invalid access' });
              }
            })
            .catch(next);
        } catch(err) {
          next(err);
        }
    } else {
        next({ status: 401, message: 'You must log in first'});
    }
}

function authorization(req, res, next) {
    let userId = req.userLoggedIn.id;
    Product.findById(req.params.id)
    .then(product => {
        if (product) {
            if (String(product.UserId) === userId) {
              next();
            } else {
              next({ status: 403, message: 'Unauthorized process!' });
            }
        } else {
            next({ status: 404, message: 'product not found!' });
        }
    })
    .catch(next);
}

module.exports = {
    authentication,
    authorization
}