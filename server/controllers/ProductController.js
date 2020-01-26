const Product = require('../models/Product')

class ProductController {
  static async getAll(req, res, next) {
    let filter = {}
    if (req.query.search) {
      filter['name'] = /req.query.tags/
    }
    try {
      let products = await Product
        .find(filter)
        .sort({createdAt:-1})
      res.status(200).json(products)
    } catch (error) {
      next(error)
    }   
  }

  static async create(req, res, next) {
    try {
      const {name, image, price, stock} = req.body
      const owner = req.decodedId
      let product = await Product.create({
        name, image, price, stock, owner
      })
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req, res, next) {
    try {
      let product = await Product.findById(req.params.id)
      if (product) res.status(200).json(product)
      else next({status: 404, message: 'Product is not found!'})      
    } catch (error) {
      next(error)
    }
  }
 
  static async update(req, res, next) {
    console.log(req.body.image, req.body.price)
    try {
      const {name, image, price, stock} = req.body
      let product = await Product.findByIdAndUpdate(req.params.id, {
        name, image, price, stock
      }, {omitUndefined: true, new: true})
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      let product = await Product
      .findByIdAndDelete(req.params.id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController