"use strict"

const Product = require('../models/product')

class ProductController {
    static create(req, res, next) {
        const obj = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            stock: req.body.stock
        }
        console.log(obj)
        Product.create(obj)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Product.find()
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)
    }

    static minusStock(req, res, next) {
        Product.findByIdAndUpdate(req.params.id, {
            stock: req.body.stock
        })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }
}

module.exports = ProductController