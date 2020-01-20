'use strict';
const { Customer } = require('../models');
const { verify } = require('../helpers/jwt');

module.exports = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    next({ auth: true, status: '401', message: 'You have to login' });
  } else {
    try {
      const payload = verify(token);
      const { id } = payload;
      const check = await Customer.findOne({ _id: id})
      if(!check) {
        next({ auth: true, status: '401', message: 'Token not valid' });
      } else {
        req.token = payload;
        next();
      }
    } catch (err) {
      next(err);
    }
  }
};