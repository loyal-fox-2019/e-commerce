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
        product.create({
            productName: req.body.productName,
            productImage: req.body.productImage,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        })
            .then(productData => {
                res.status(201).json(productData)
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
                console.log(err)
            })
    }

    static deleteProduct(req, res, next) {
        product.deleteOne({ _id: req.params.productId })
            .then(deleteResult => {
                res.status(200).json(deleteResult)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static updateProduct(req, res, next){
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
            return product.findOne({_id:req.params.productId})
            
        })
        .then(updatedProduct=>{
            res.status(200).json(updatedProduct)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static updateStock(req, res, next){
        product.updateOne({ _id:req.params.productId }, {
            stock: req.body.stock
        })
        .then(updatedProduct=>{
            // console.log(updatedProduct)
            return product.findOne({_id:req.params.productId})
        })
        .then(updatedProduct=>{
            res.status(200).json(updatedProduct)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

module.exports = ProductController