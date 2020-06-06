const Product = require('../models/Product')
class ProductController{
  static create(req, res, next){
    const form = req.body
    console.log(form)
    Product
      .create({
        name: form.name,
        image: form.image,
        price: form.price,
        stock: form.stock,
        description: form.description,
        seller : req.userId
      })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }
  static uploadImage(req, res, next){
    res.status(201).json({
      image: req.body.image
    })
  }
  static getAll(req, res, next){
    Product
      .find()
      .populate({ path: 'seller', select: 'fullname' })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static get(req, res, next) {
    Product
      .findOne({
        _id: req.params.id
      })
      .populate({ path: 'seller', select: 'fullname' })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static update(req, res, next){
    const form = req.body
    Product
      .updateOne({ _id: req.params.id }, {
        name: form.name,
        image: form.image,
        price: form.price,
        stock: form.stock,
        description: form.description
      })
      .then(product => {
        return Product.findOne({  _id: req.params.id  })
      })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
  static delete(req, res, next){
    Product
      .deleteOne({
        _id: req.params.id 
      })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }
}
module.exports = ProductController