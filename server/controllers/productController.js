const { Product } = require('../models')
const { sign } = require('../helpers/token')
const { compare } = require('../helpers/bcrypt')

class ProductController{
  static showProducts(req, res, next){
    Product
      .find({})
      .populate('userId', 'username -_id')
      .then((products) => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static showProduct(req, res, next){
    Product
      .findOne({_id: req.params.productId})
      .populate('userId', 'username -_id')
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static getUserProducts(req, res, next){
    Product
      .find({userId: req.userData._id})
      .then((products) => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static getOtherUserProducts(req, res, next){
    Product
      .find({userId: {$ne: req.userData._id}})
      .populate('userId', 'username -_id')
      .then((products) => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static postProduct(req, res, next){
    let { name, image, price, stock } = req.body
    let userId = req.userData._id
    if (image == 'null'){
      image = 'https://storage.googleapis.com/product-image-carl/250.png'
    }
    let createObj = { name, image, price, stock, userId }
    Product
      .create(createObj)
      .then((product) => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static editProduct(req, res, next){
    let { name, image, price, stock } = req.body
    if (image == 'null'){
      image = undefined
    }
    let productId = req.params.productId
    let editObj = { name, image, price, stock }
    let options = { new: true, omitUndefined: true}
    Product
      .findByIdAndUpdate(productId, editObj, options)
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)

  }

  static deleteProduct(req, res, next){
    let productId = req.params.productId
    Product
      .findByIdAndDelete(productId)
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(next)
  }
}

module.exports = ProductController