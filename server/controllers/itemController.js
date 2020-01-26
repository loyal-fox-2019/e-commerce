const Item = require('../models/item')

class ItemController {
    static getItem (req, res, next) {
        Item.find()
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Data not found'
                })
            })
    }

    static getItemCategory (req, res, next) {
        console.log(req.params.category)
        Item.find({category: req.params.category})
            .then(results => {
                res.status(200).json(results)
            })
            .catch(err => {
                console.log(err)
                res.status(404).json({
                    message: 'data not found',
                    err
                })
            })
    }

    static getSingleItem (req, res, next) {
        Item.findById(req.params.id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'internal server error',
                    err
                })
            })
    }

    static addItem (req, res, next) {
        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            stocks: req.body.stocks,
            category: req.body.category,
            user_id: req.loggedIn.id
        }
        console.log('ini datanya', data)

        Item.create(data)
            .then(result => {
                res.status(201).json({
                    message: 'Item created',
                    result
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: 'Failed add item',
                    err
                })
            })
    }

    static removeItem (req, res, next) {
        Item.remove({_id: req.params.id})
            .then(() => {
                res.status(200).json({
                    message: 'Item has been removed'
                })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Item not found',
                    err
                })
            })
    }

    static editItem (req, res, next) {
        const id = req.params.id
        const data = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            stocks: req.body.stocks,
            category: req.body.category,
            user_id: req.loggedIn.id
        }

        Item.update({_id: id}, data)
            .then(result => {
                res.status(200).json({
                    message: 'Item updated',
                    result
                })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Item not found',
                    err
                })
            })
    }
}

module.exports = ItemController