function errorHandler(err, req, res, next){
  let errorCode = err.errorStatus || 500
  let message = err.errorMessage || 'Internal Server Error'
  if (err.errors){
    errorCode = 400
    message = ''
    for (let field in err.errors){
      message += err.errors[field].message + '<br>'
    }
  }
  if (err.name == 'JsonWebTokenError'){
    errorCode = 400
    message = err.message
  }
  res.status(errorCode).json({message})
}

module.exports = errorHandler