const jwt = require('jsonwebtoken')

module.exports = {
  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
  },
  verifyToken(payload) {
    return jwt.verify(payload, process.env.JWT_SECRET)
  }
}