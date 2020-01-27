const product = require('../models/product')

class ProductController {
    static findAllProducts(req, res, next) {
        product.find()
            .then(allProducts => {
                res.status(200).json(allProducts)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static createProduct(req, res, next) {
        // console.log('ini Product Controller', req.body)
        product.create({
            productName: req.body.productName,
            productImage: req.body.productImage,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        })
            .then(productData => {
                return product.find()
            })
            .then(products => {
                res.status(201).json(products)
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findOneProduct(req, res, next) {
        product.findOne({ _id: req.params.productId })
            .then(productData => {
                res.status(200).json(productData)
            })
            .catch(err => {
                next()
            })
    }

    static deleteProduct(req, res, next) {
        product.deleteOne({ _id: req.params.productId })
            .then(deleteResult => {
                return product.find()
            })
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                next()
            })
    }

    static updateProduct(req, res, next){
        // console.log(req.body)
        product.updateOne({ _id:req.params.productId },{
            productName: req.body.productName,
            productImage: req.body.productImage,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        })
        .then(success=>{
            // console.log(updatedProduct)
            return product.find()
        })
        .then(allProducts=>{
            res.status(200).json(allProducts)
        })
        .catch(err=>{
            next()
        })
    }

    static updateStock(req, res, next){
        product.updateOne({ _id:req.params.productId }, {
            stock: req.body.stock
        })
        .then(updatedProduct=>{
            // console.log(updatedProduct)
            return product.find()
        })
        .then(allProducts=>{
            res.status(200).json(allProducts)
        })
        .catch(err=>{
            next()
        })
    }
}

module.exports = ProductController