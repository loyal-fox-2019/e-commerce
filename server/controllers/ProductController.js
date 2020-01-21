const Product = require('../models/Product')

class ProductController{
    static create(req, res, next){
        Product
            .create({
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price
            })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                console.log(err)
            })
    }
    static getAll(req, res, next){
        Product
        .find()
        .then(products => {
            res.status(200).json(products)
        })
        .catch(next)
    }

    static update(req, res, next){
        Product
            .updateOne({ _id: req.params.id },{
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price
            })
            .then(product => {
                return Product.findOne({ _id: req.params.id })
            })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static delete (req, res, next){
        Product
            .deleteOne({ _id: req.params.id})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = ProductController