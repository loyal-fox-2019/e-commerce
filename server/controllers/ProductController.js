'use strict';

const Product = require('../models/product');

class ProductController {
    static find(req, res, next) {
        Product.find({})
        .then(listProducts => {
            res.status(200).json(listProducts);
        })
        .catch(next)
    }

    static findById(req, res, next) {
        const id = req.params.id;
        Product.findById({ _id: id })
        .then(product => {
            res.status(200).json(product);
        })
        .catch(next)
    }

    static create(req, res, next) {
        const { name, brand, category, description, price, stock, file } = req.body;
        Product.create({
            name,
            brand,
            category,
            description,
            price,
            stock,
            file,
        })
        .then(productCreate => {
            res.status(201).json(productCreate);
        })
        .catch(next);
    }

    static update(req, res, next) {
        const id = req.params.id;
        const { name, brand, category, description, price, stock, file } = req.body;
        Product.findByIdAndUpdate(
            {
                _id: id
            },
            {
                name,
                brand,
                category,
                description,
                price,
                stock,
                file,
            }
            )
        .then(product => {
            res.status(200).json(product);
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id;
        Product.findByIdAndDelete({ _id: id})
        .then(response => {
            res.status(200).json(response)
        })
        .catch(next);
    }
}

module.exports = ProductController;