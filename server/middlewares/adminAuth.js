const createError = require('http-errors')

function adminAuth(req, res, next) {
  if (req.decoded.role === 'admin') {
    next()
  } else {
    throw createError(401, 'You are not admin')
  }
}

module.exports = adminAuth