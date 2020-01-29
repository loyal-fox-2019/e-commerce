const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
    },
    comparePassword: function(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
};
