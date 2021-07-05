const Item = require('../models/item')

class ItemCtr {
    static create(req, res, next) {
        Item.create({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            stock: req.body.stock
        })
        .then((item) => {
            res.status(201).json({
                message: "new item created!",
                item
            })
        })
        .catch(next)
    }

    static getItems(req, res, next) {
        Item.find()
        .then((items) => {
            res.status(200).json(items)
        })
        .catch(next)
    }

    static edit(req, res, next) {
        let id = req.params.id

        Item.findByIdAndUpdate(id, {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            stock: req.body.stock
        })
        .then(() => {
            Item.findById(id)
            .then((updatedItem) => {
                res.status(200).json({
                    message: "item updated successfully!",
                    updatedItem
                })
            })
        })
        .catch(next)
    }

    static delete(req, res, next) {
        let id = req.params.id

        Item.findByIdAndDelete(id)
        .then((deletedItem) => {
            if (deletedItem !== null) {
                res.status(200).json({
                    message: "item deleted successfully!",
                    deletedItem
                })
            } else {
                res.status(400).json({
                    message: "item not found!"
                })
            }
        })
        .catch(next)
    }
}

module.exports = ItemCtr