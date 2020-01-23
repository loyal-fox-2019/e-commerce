const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(5)

module.exports = {
    generateHash( password ){
        return bcryptjs.hashSync( password, salt )
    },
    verifyHash( inputPassword, queryPassword ){
        return bcryptjs.compareSync( inputPassword, queryPassword )
    }
}