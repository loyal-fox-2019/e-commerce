'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 8;

class Bcrypt {
    static hashPassword(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    static verifyPassword(password, salt) {
        return bcrypt.compareSync(password, salt)
    }
}

module.exports = Bcrypt;