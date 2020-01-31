'use strict';
const bcrypt = require('bcryptjs');

const SALT = bcrypt.genSaltSync(10);

function hash(password) {
  return bcrypt.hashSync(password, SALT);
}

function compare(input, password) {
  const isMatch = bcrypt.compareSync(input, password)
  return isMatch;
}

module.exports = {
  hash,
  compare,
};
