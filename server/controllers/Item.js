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
        Item.findById({ id: req.params.id })
            .then((item) => {
                res.status(200).json(item)
            }).catch((err) => {
                next(err)
            });
    }
}

module.exports = ItemController