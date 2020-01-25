const Product = require("../models/product");
const _ = require("underscore");

class ProductController
{
    static getAllProducts(req,res,next)
    {
        Product.find()
        .exec()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    static getOneProduct(req,res,next)
    {
        Product.findById(req.params.id)
        .exec()
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    static addNewProduct(req,res,next)
    {
        const data = _.pick(req.body,'name','price','image','stock');
        data.tags = req.body.tags.split(' ').filter((v) => {return !!v});
        data.seller = req.userInfo.id;

        Product.create(data)
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

module.exports = ProductController;