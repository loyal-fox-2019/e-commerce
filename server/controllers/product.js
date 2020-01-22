const Product = require('../models/product')

class ProductController {
  static all(req, res, next) {
    Product
      .find()
      .populate('user', 'username profile_pic -_id')
      .then(products => {
        res.send(products)
      })
      .catch(next)
  }
  static sale(req, res, next) {
    let user = req.user.id
    Product
      .find()
      .populate('user', 'username profile_pic')
      .then(products => {
        res.send(products.filter(function(product) {
          return product.user.id != user
        }) )
      })
      .catch(next)
  }
  static own(req, res, next) {
    let user = req.user.id
    Product
      .find({user})
      .populate('user', 'username profile_pic -_id')
      .then(products => {
        res.send(products)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { name, stock, price, description, category, image } = req.body,
      user = req.user._id
    Product
      .create({ name, stock, price, description, category, image, user })
      .then(product => {
        res.send(product)
      })
      .catch(next)
  }
  static remove(req, res, next) {
    let _id = req.params.id
    Product
      .deleteOne({ _id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static stock(req, res, next) {
    let _id = req.params.id,
      stock = req.body.stock
    Product
      .updateOne({ _id },{ stock })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ProductController