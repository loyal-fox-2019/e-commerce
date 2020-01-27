function errorHandler(err, req, res, next) {
    if(err){
        // console.log('INI MIDDLEWARE',err)
        res.status(500).json(err)
    } else if(!err) {
        res.status(400).json({ err: 'internal server error'})
    }
  }
  
  module.exports = errorHandler
  