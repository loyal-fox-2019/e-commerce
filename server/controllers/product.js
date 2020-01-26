const { Product } = require('../models');

class ProductController {
  static create(req, res, next) {
    Product.create(req.body)
      .then(product => {
        res.status(201).json({
          message: `Product has been successfully created!`
        });
      })
      .catch(err => next(err));
  }

  static readAll(req, res, next) {
    Product.find({})
      .then(products => {
        if (products.length === 0) {
          res.status(404);
          throw new Error('Product collection is empty!');
        } else {
          res.status(200).json({
            message: 'All products are successfully retrieved!',
            data: products
          });
        }
      })
      .catch(err => next(err));
  }

  static readOne(req, res, next) {
    Product.findById(req.params.productId)
      .then(product => {
        if (!product) {
          res.status(404);
          throw new Error(`Product is not found!`);
        } else {
          res.status(200);
          res.json({
            message: `Product is successfully retrieved!`,
            data: product
          });
        }
      })
      .catch(err => next(err));
  }

  static update(req, res, next) {
    Product.findByIdAndUpdate(req.params.productId, req.body, {
      useFindAndModify: true
    })
      .then(product => {
        if (!product) {
          res.status(404);
          throw new Error(`Product is not found!`);
        } else {
          res.status(200);
          res.json({
            message: `Product is successfully updated!`
          });
        }
      })
      .catch(err => next(err));
  }

  static delete(req, res, next) {
    Product.findByIdAndDelete(req.params.productId, { useFindAndModify: true })
      .then(product => {
        if (!product) {
          res.status(404);
          throw new Error(`Product is not found!`);
        } else {
          res.status(200);
          res.json({
            message: `Product is successfully removed!`
          });
        }
      })
      .catch(err => next(err));
  }
}

module.exports = ProductController;
