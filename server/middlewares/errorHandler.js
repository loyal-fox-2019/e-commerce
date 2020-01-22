function errorHandler(err, req, res, next) {
   console.log(err)

   let errorCode = err.errorCode || 500
   let message = err.message || 'Internal server error'

   const tempMessage = []

   if(err.errors) {
      for(let key in err.errors) tempMessage.push(err.errors[key].message)
   }

   if(tempMessage.length > 0) {
      errorCode = 400
      message = tempMessage
   }

   res.status(errorCode).json({message})
}

module.exports = errorHandler