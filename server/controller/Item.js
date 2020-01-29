const Item = require('../model/item');

class ItemController {
    static list(req, res, next) {
        Item.find()
            .populate('owner', 'name ')
            .then(response => {
                res.status(200).json({
                    data: response
                })
            })
            .catch(next)
    }

    static findItem(req, res, next) {
        Item.find({
            name: {$regex: req.params.itemName, $options: 'i'}
        })
            .populate('owner', 'name ')
            .then(response => {
                if (response.length > 0) {
                    res.status(200).json({
                        data: response
                    })
                } else {
                    throw ({
                        code: 404,
                        errMsg: 'data'
                    })
                }
            })
            .catch(next)
    }

    static register(req, res, next) {
        Item.create({
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            image: req.body.image,
            owner: req._id,
            description: req.body.description
        }).then(response => {
            res.status(201).json({
                message: "Item successfully registered",
                data: response
            })
        }).catch(next)
    }

    static update(req, res, next) {
        Item.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description
        }).then(response => {
            res.status(200).json({
                message: "Item successfully updated"
            })
        }).catch(next)
    }

    static delete(req, res, next) {
        Item.deleteOne({
            _id: req.params.id
        }).then(response => {
            res.status(200).json({
                message: "Item successfully deleted"
            })
        }).catch(next)
    }
}

module.exports = ItemController;