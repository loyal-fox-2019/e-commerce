const productModel = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;

class Product {
    static getAllProductsByFilter(req, res, next) {
        let productPromise
        if (!req.query.name) {
            productPromise = productModel.find()
        } else {
            productPromise = productModel.find({
                name: new RegExp(req.query.name, 'g')
            })
        }

        productPromise
            .populate(['seller'])
            .then((products) => {
                res.status(200).json(products)
            }).catch(next);
    }

    static getProductById(req, res, next) {
        productModel.find({
                _id: ObjectId(req.params.id)
            })
            .populate(['seller'])
            .then((products) => {
                if (!products.length) {
                    let err = new Error('Product not found');
                    err.statusCode = 404
                    err.errMessage = 'Product not found'
                    throw err
                }
                res.status(200).json(products)
            }).catch(next);
    }

    static addNewProduct(req, res, next) {
        productModel
            .create({
                seller: req.userLogin._id,
                ...req.body
            })
            .then((product) => {
                res.status(201).json(product)
            })
            .catch(next);
    }

    static editProductById(req, res, next) {
        if (req.body.images && !req.body.images.length) {
            delete req.body.images
        }

        productModel
            .updateOne({
                _id: req.params.id
            }, req.body)
            .then((result) => {
                res.status(200).json({
                    result,
                    ...req.body
                })

            })
            .catch(next);
    }

    static deleteProductById(req, res, next) {
        productModel
            .deleteOne({
                _id: ObjectId(req.params.id),
                seller: req.userLogin.id
            })
            .then((result) => {
                res.status(200).json({
                    result
                })
            })
            .catch(next);
    }
}

module.exports = Product;