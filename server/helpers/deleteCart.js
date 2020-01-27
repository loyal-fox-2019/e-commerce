'use strict';

const Cart = require('../models/cart');

module.exports = function() {
    if(process.env.NODE_ENV === 'test') {
        Cart
        .deleteMany({})
        .then(function() {
            console.log('Deleted all Cart data.');
        })
        .catch(function(err) {
            console.log('Error Delete Many Cart: ', err);
        })
    }
}
