module.exports = function(err, req, res, next) {
  console.log(err)
  if (err.name == 'ValidationError') {
    // res.json(err)
    if (typeof err.errors == 'object') {
      let errors = []
      for (const key in err.errors) {
        if (err.errors.hasOwnProperty(key)) {
          const error = err.errors[key]
          errors.push(error.message)
        }
      }
      res.status(400).json(errors)
    } else {
      let errors = []
      err.errors.forEach(error => {
        errors.push(error.message)
      })
      res.status(400).json(errors)
    }
  } else {
    res.json(err)
  }
}
