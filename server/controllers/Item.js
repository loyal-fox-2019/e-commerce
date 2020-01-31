"use strict"

const Item = require('../models/Item')

class ItemController {
    static findAll(req, res, next) {
        Item.find()
            .then((items) => {
                res.status(200).json(items)
            }).catch((err) => {
                next(err)
            });
    }
    static findOne(req, res, next) {
        Item.findById({ _id: req.params.id })
            .then((item) => {
                res.status(200).json(item)
            }).catch((err) => {
                next(err)
            });
    }
    static create(req, res, next) {
        Item.create({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: Math.round(Number(req.body.price)),
            stock: Math.round(Number(req.body.stock))
        })
            .then((item) => {
                res.status(201).json(item)
            }).catch((err) => {
                next(err)
            });
    }
    static update(req, res, next) {
        Item.findByIdAndUpdate({
            _id: req.params.id
        }, {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: Math.round(Number(req.body.price)),
            stock: Math.round(Number(req.body.stock))
        })
            .then((item) => {
                if (item.nModified !== 0) {
                    res.status(200).json("success update data")
                } else if (item.n === 0) {
                    next({
                        status: 404,
                        message: "data not found"
                    })
                } else {
                    next({
                        status: "no found",
                        message: "no found updated"
                    })
                }
            }).catch((err) => {
                next(err)
            });
    }
    static delete(req, res, next) {
        Item.findOneAndDelete({
            _id: req.params.id
        }, {
            role: req.user.role
        })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = ItemController