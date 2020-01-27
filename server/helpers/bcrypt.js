'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
    hash(inputPassword) {
        return bcrypt.hashSync(inputPassword)
    },
    compare(inputPassword, userPassword) {
        return bcrypt.compareSync(inputPassword, userPassword)
    }
}