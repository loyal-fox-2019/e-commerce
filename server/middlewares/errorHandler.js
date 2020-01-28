module.exports = (err, req, res, next) => {
  let status, message;
  console.log(err, '<<<<')
  console.log(err.name, err.message, '*****')

  if (err.name) {
    switch (err.name) {
      case "CastError":
        status = err.code 
      break;
      case "ValidationError":
        status = 400;
      break;
      case 'NotFoundError':
        status = 404;
      break;
      case 'BadRequestError':
        status = 400;
      break
    }
  } else {
    status = err.code || 500;
  }
  
  message = err.message || "Internal server error"
  console.log(status, message, '!!!!!!!!!!')
  res.status(status).json({ message: message });
}