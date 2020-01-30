const bcrypt = require('bcrypt')

function hashPassword(plainPass) {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(plainPass, salt)

    return hash
}

function comparePassword(plainPass, hashPass){
    const compare = bcrypt.compareSync(plainPass, hashPass)

    return compare
}

module.exports = {hashPassword, comparePassword}
