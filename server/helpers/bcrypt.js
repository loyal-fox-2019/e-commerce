const bcrypt = require('bcrypt')
const saltRounds = 8

function hash(plainPass){
    let hashedPass = bcrypt.hashSync(plainPass, saltRounds)
    return hashedPass
}

module.exports = hash