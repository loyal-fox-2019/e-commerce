const ProductModel = require('../models/product')

class ProductController {
    static create(req,res,next){
        let {name,description,price,picture,stock} = req.body
        ProductModel.create({
            name,
            description,
            price,
            picture,
            stock,
            userOwner: req.user.userId
        })
        .then(created=>{
            res.status(201).json(created)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static getAll(req,res,next){
        ProductModel.find().populate('userOwner', '-password -__v')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static getById(req,res,next){
        ProductModel.findById(req.params.productId).populate('userOwner', '-password -__v')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static getUserProducts(req,res,next){
        ProductModel.find({
            userOwner: req.user.userId
        }).populate('userOwner', '-password -__v')
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static update(req,res,next){
        ProductModel.findByIdAndUpdate(req.params.productId, req.body)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static delete(req,res,next){
        ProductModel.findByIdAndDelete(req.params.productId)
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports = ProductController