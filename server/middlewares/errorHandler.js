'use strict'

module.exports = (err, req, res, next) => {
  // console.log(err)

  let status, message, mongooseError
  switch (err.name) {
    case "MongoError":
      status = 400
      if (err.keyValue.email) {
        message = ["Email is already in use"]
      } else {
        message = ["Username is already in use"]
      }
      break;
    case "ValidationError":
      mongooseError = err.errors
      status = 400
      message = []
      for (let key in mongooseError) {
        message.push(mongooseError[key].message)
      }
      break;

    case "JsonWebTokenError":
      status = 401
      message = "Invalid Access Token"
      break;

    default:
      status = err.status || 500
      message = err.message || 'Internal Server Error'
      break;
  }

  res.status(status).json({ message })
}