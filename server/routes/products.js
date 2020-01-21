const productsRouter = require("express").Router();
const Product = require("../models/product");
const _ = require("underscore");

productsRouter.get('/',(req,res,next) => {
    Product.find()
    .exec()
    .then((products) => {
        res.status(200).json(products);
    })
    .catch((err) => {
        console.log(err);
    })
});

productsRouter.get('/:id',(req,res,next) => {
    Product.findById(req.params.id)
    .exec()
    .then((product) => {
        res.status(200).json(product);
    })
    .catch((err) => {
        console.log(err);
    })
});

productsRouter.post('/',(req,res,next) => {
    const data = _.pick(req.body,'name','price','image');
    data.tags = req.body.split(' ').filter((v) => {return !!v});

    Product.create(data)
    .then((product) => {
        res.status(201).json(product);
    })
    .catch((err) => {
        console.log(err);
    })
});

productsRouter.delete('/:id',(req,res,next) => {
    Product.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
        res.sendStatus(204);
    })
    .catch((err) => {
        console.log(err);        
    })
})

module.exports = productsRouter;