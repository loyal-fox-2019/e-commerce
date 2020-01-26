const Product = require('../models/product')

module.exports = class {
  static createProduct(req, res, next) {
    let product2create = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      description: req.body.description,
      image: req.body.file
    }
    Product.create(product2create)
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllProduct(req, res, next) {
    Product.find()
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static findone(req, res, next) {
    let id = req.params.productId
    Product.findById(id)
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let id = req.params.productId
    Product.findByIdAndDelete(id)
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'Delete Success'
          })
        } else {
          throw new Error('Item id not found')
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static update(req, res, next) {
    let id = req.params.productId
    let newProduct = {
      name: req.body.name,
      image: req.body.file,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      description: req.body.description
    }
    Product.findByIdAndUpdate(id, newProduct, { new: true })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}
