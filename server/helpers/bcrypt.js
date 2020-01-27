const bcrypt = require('bcrypt')
const saltRound = 10

const encryptPassword = password => {
    const hashPassword = bcrypt.hashSync(password, saltRound)
    return hashPassword
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    encryptPassword,
    comparePassword
}