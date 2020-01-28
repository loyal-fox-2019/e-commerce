const bcryptjs = require('bcryptjs')

module.exports = {
  hash(payload) {
    return bcryptjs.hashSync(payload, bcryptjs.genSaltSync(6))
  },
  compare(payload, hash) {
    return bcryptjs.compareSync(payload, hash)
  }
}