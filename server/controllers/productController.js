'use strict'

const Product = require('../models/product'),
      productErr = {status: 404, message: 'Product not found'};

module.exports = class ProductController {

  static create(req, res, next) {
    const { name, price, stock, description, category, weight, brand } = req.body
    Product.create({ name, price, stock, description, weight, category, brand, seller: req.decoded.id, image: req.file.cloudStoragePublicUrl })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Product.find()
      .populate('seller', 'name email image')
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findMine(req, res, next) {
    let arr = []
    Product.find()
      .then(products => {
        products.forEach(product => {
          if (String(product.seller) === String(req.decoded.id)) {
            arr.push(product)
          }
        })
        res.status(200).json(arr)
      })
      .catch(next)
  }

  static search(req, res, next) {
    Product.find({ "name" : new RegExp(req.params.keyword, 'i') })
      .populate('seller', 'name email image')
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Product.findById(req.params.id)
      .populate('seller', 'name email image')
      .then(product => {
        if (!product) {
          next(productErr)
        }
        res.status(200).json(product)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { name, price, stock, description, category, weight, brand } = req.body
    Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, description, weight, category, brand, image: req.file.cloudStoragePublicUrl },
      { new: true, runValidators: true, omitUndefined: true }
    )
    .then(product => {
      if (!product) {
        next(productErr)
      }
      res.status(200).json(product)
    })
    .catch(next)
  }

  static destroy(req, res, next) {
    console.log(req.params.id)
    Product.findByIdAndDelete(req.params.id)
      .then(product => {
        if (!product) {
          next(productErr)
        }
        res.status(200).json({ message: 'Product successfully deleted!' })
      })
      .catch(next)
  }
}