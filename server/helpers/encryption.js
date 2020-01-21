const bcrypt = require('bcrypt')

function hash(password){
    const saltRounds = 5
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

function compare(password, hashed){
    const compared = bcrypt.compareSync(password, hashed);
    return compared
}

module.exports = {
    hash,
    compare
}