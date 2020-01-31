function errorHandler(err, req, res, next) {
    if(err){
        console.log('INI MIDDLEWARE Error:',err)
        res.status(500).send(err)
    } else if(!err) {
        res.status(400).send('internal server error')
    }
  }
  
  module.exports = errorHandler
  