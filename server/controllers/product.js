'use strict'

const Product = require('../models/product')

class productController {
    static findAll(req, res, next) {
        Product
            .find({})
            .then((allProducts) => {
                res.status(200).json(allProducts)
            })
            .catch(next)
    }

    static findOneProduct(req, res, next) {
        Product
            .findOne({ _id: req.params.id })
            .then((findOneProduct) => { res.status(200).json(findOneProduct) })
            .catch(next)
    }

    static createProduct(req, res, next) {
        const { name, price, stock, designer, description } = req.body
        let gcsUrl
        if (!req.file) gcsUrl = `https://semantic-ui.com/images/wireframe/image.png`
        else gcsUrl = req.file.gcsUrl
        Product
            .create({
                name,
                price,
                stock,
                image: gcsUrl,
                designer,
                description
            })
            .then((createdProduct) => { res.status(201).json({ message: 'Added a new product!', createdProduct }) })
            .catch(next)
    }

    static updateProduct(req, res, next) {
        const { name, price, stock, designer, description } = req.body
        let gcsUrl
        Product
            .findOne({
                _id: req.params.id
            })
            .then((updatedProduct) => {
                if (req.file) {
                    gcsUrl = req.file.gcsUrl
                }
                else {
                    gcsUrl = updatedProduct.image
                }
                return Product.findOneAndUpdate({ _id: req.params.id }, { name, price, image: gcsUrl, stock, designer, description }, { new: true })
            })
            .then((updatedProduct) => { res.status(200).json({ message: 'Updated product!', updatedProduct }) })
            .catch(next)
    }

    static deleteProduct(req, res, next) {
        Product
            .findOneAndDelete({ _id: req.params.id })
            .then((deletedProduct) => {
                if (!deletedProduct) {
                    res.status(404).json({ message: 'not found' })
                }
                else {
                    res.status(200).json({ message: 'Deleted product!', deletedProduct })
                }
            })
            .catch(next)
    }
}
module.exports = productController