const bcrypt = require('bcryptjs')

module.exports = {
    hash: function (password) {
        return bcrypt.hashSync(password, 7)
    },
    dehash: function (password, pw_db) {
        return bcrypt.compareSync(password, pw_db)
    }
}