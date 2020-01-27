'use strict';

const jwt = require('../helper/jwt');
const Cart = require('../models/cart');

function cartAuthorization(req, res, next) {
    const payload = jwt.verifyToken(req.headers.token);
    Cart.findOne({_id: req.params.id})
    .then(cart => {
        if(cart.userId == payload.id) {
            next();
        } else {
            throw({status: 403, message: 'You do not have access to this cart item'})
        }
    })
    .catch(error => {
        res.status(error.status).json({
            message: error.message
        })
    })
}

module.exports = cartAuthorization;