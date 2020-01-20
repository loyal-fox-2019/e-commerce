const modelProduct = require('../models/modelProduct')

class ControlProduct {
    static addProduct(req, res) {

        modelProduct.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            file: req.body.file,
            stock: req.body.stock
        })
            .then(productPosted => {
                res.status(201).json(productPosted)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
                // for (let key in err.errors.name) {
                //     if (err.errors.name[key] === "ValidatorError") {

                //     }
                // }
            })
    }

    static getAllProduct(req, res) {
        modelProduct.find()
            .then(allProducts => {
                res.status(200).json(allProducts)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findByName(req, res) {
        modelProduct.find({ name: new RegExp(req.params.name, "i") })
            .then(resultProduct => {
                res.status(200).json(resultProduct)

            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static updateProduct(req, res) {
        modelProduct.findByIdAndUpdate(req.params.id, req.body)
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                console.log("err adalah: ", err)
                res.status(500).json(err)
            })
    }

    static deleteProduct(req, res) {
        modelProduct.findByIdAndDelete(req.params.id)
            .then(toBeDeleted => {
                res.status(200).json(toBeDeleted)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = ControlProduct