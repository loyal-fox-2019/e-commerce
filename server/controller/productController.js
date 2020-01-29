const Product = require('../models/Product');

class productController {
  // show all product
  static showAll(req, res, next) {
    Product.find()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
  }
  // add product
  static add(req, res, next) {
    res.json(res.locals.user);
  }
  // edit product
  static edit(req, res, next) {
    
  }
  // delete product
  static delete(req, res, next) {
    
  }
}

module.exports = productController;