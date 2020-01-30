'use strict';

const { verifyToken } = require('./jwt');
const Cart = require('../models/cart');
const User = require('../models/user');

function authentication(req, res, next) {
  if (req.headers.hasOwnProperty('token')) {
      try {
        req.userLoggedIn = verifyToken(req.headers.token);
        User.findById(req.userLoggedIn.user._id)
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
  let UserId = req.userLoggedIn.user._id;
  Cart.findById( req.params.id )
  .then(cart => {
      if(cart) {
          if(String(cart.UserId) === UserId) {
              next();
          } else {
              next({ status: 400, message: 'Unauthorize' })
          }
      } else {
          next({ status: 400, message: 'Data not found' })
      }
  })
  .catch(next)
}

module.exports = {
    authentication,
    authorization
}