const { Product } = require('../models')

function authorizeProductOwner(req, res, next){
  Product
    .findById(req.params.productId)
    .then((product) => {
      if (product.userId == req.userData._id){
        next()
      }
      else {
        throw {errorCode: 401, errorMessage: 'You are not authorized'}
      }
    })
    .catch(next)
}

module.exports = authorizeProductOwner