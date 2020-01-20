'use strict';

module.exports = (req, res, next) => {
  const { email } = req.token;
  if (email == 'admin@csskins.com' || email == 'admin@mail.com') {
    next();
  } else {
    next({ auth: true, status: 401, message: 'Unauthorized' });
  }
}