'use strict'

const { Product } = require('../models')
const Unggah = require('unggah')

const storage = Unggah.gcs({
  keyFilename: 'keyfile.json',
  bucketName: process.env.GOOGLE_CLOUD_BUCKET,
})

class productController {
  static addProduct(req, res, next) {
    const { name, weight, quantity, image, price, category } = req.body
    Product
      .create({ name, weight, quantity, image, price, category })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Product
      .find()
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static findSeriesBatik(req, res, next) {
    Product
      .find({ category: 'SB' })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static findEmasBatang(req, res, next) {
    Product
      .find({ category: 'EB' })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    let id = req.params.id
    Product
      .findById(id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let id = req.params.id
    let { name, weight, quantity, price } = req.body
    let value = {
      name, weight, quantity, price
    }

    Product
      .findByIdAndUpdate(id, value, { new: true, omitUndefined: true })
      .then(item => {
        res.status(200).json(item)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    Product
    .findByIdAndDelete(id)
    .then(item => {
      let split = item.image.split('/')
      storage.delete(split[4])
    })
    .then(() => {
      res.status(200).json({
        message: 'Product success to deleted'
      })
    })
    .catch(next)
  }
}

module.exports = productController