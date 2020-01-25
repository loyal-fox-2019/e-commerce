const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

module.exports = hashPassword;