const bcrypt = require('bcrypt')

function matchPass(passMasuk, passDB) {
    let match = bcrypt.compareSync(passMasuk, passDB)
    return match
}

module.exports = matchPass