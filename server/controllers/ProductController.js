'use strict';

const Product = require('../models/product');


class ProductController {
    static create(req, res, next) {
        const newProduct = {
            productImage: req.body.file,
            brand: req.body.brand,
            type: req.body.type,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price
        }
        Product.create(newProduct)
        .then(product => {
            res.status(201).json({
                message:'Product has been added to the list',
                data: product
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static read(req, res, next) {
        Product.find()
        .then(products => {
            res.status(200).json({
                message: 'OK',
                data: products
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static readOne(req, res, next) {
        Product.findOne({_id: req.params.id})
        .then(product => {
            res.status(200).json({
                message: 'OK',
                data: product
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static update(req, res, next) {
        const updateProduct = {
            brand: req.body.brand,
            type: req.body.type,
            description: req.body.description,
            stock: req.body.stock,
            price: req.body.price
        }
        Product.updateOne({_id: req.params.id}, updateProduct)
        .then(result => {
            res.status(200).json({
                message: 'Product has been successfully updated',
                data: result
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static delete(req, res, next) {
        Product.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: 'Product has been successfully deleted',
                data: result
            })
        }) 
        .catch(error => {
            next(error);
        })
    }
}

module.exports = ProductController;