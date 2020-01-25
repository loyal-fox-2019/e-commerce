const Product = require('../models/product')

class Controller {

    static create(req, res, next) {
        // console.log('data di controller', req.body);
        let data = {
            seller: req.decoded.id,
            ...req.body
        }
        Product.create(data)
            .then((product) => {
                res.status(201).json(product)
            }).catch(next);
    }

    static showAllProducts(req, res, next) {
        Product.find().populate('seller', 'name phone')
            .then((products) => {
                // console.log(products);
                res.status(200).json(products)
            })
            .catch((err) => {
                // console.log('masuk errornya');
                next(err)
            });
    }

    static showOneProduct(req, res, next) {
        Product.findById(req.params.id).populate('seller', 'name phone')
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            next(err)
        });
    }

    static showMyProduct(req, res, next) {
        Product.find({ seller: req.decoded.id }).populate('seller', 'name phone')
            .then((products) => {
                res.status(200).json(products)
            }).catch(next);
    }

    static deleteProduct(req, res, next) {
        // console.log(req.params.id);
        Product.findByIdAndRemove(req.params.id)
            .then((result) => {
                res.status(200).json(result)
            }).catch((next));
    }

    static updateProductData(req, res, next) {
        const objectForPatch = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            weight: req.body.weight,
            city: req.body.city
        }

        Product.findByIdAndUpdate(req.params.id, objectForPatch, { new: true }).populate('seller', 'name phone')
            .then((product) => {
                return res.status(200).json(product)
            })
            .catch(next)
    }

}

module.exports = Controller