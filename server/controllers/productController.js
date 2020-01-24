const Product = require('../models/productsModel');

class productController{
    static create(req,res,next){
        Product.create({
            name : req.body.name,
            price : req.body.price,
            imgUrl : req.body.imgUrl,
            description : req.body.description,
            quantity : req.body.quantity,
            seller : req.body.seller,
            condition : req.body.condition
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(500)
        })
    }

    static findAll(req,res,next){
        Product.find().populate('seller')
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }

    static findOne(req,res,next){
        Product.findOne({
            _id : req.params._id
        }).populate('User')
        .then(response => {
            if(!response){
                next(400)
            }
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }

    static edit(req,res,next){
        Product.FindOneAndUpdate({
            _id : req.params._id 
        },{
            name : req.body.name,
            price : req.body.price,
            imgUrl : req.body.imgUrl,
            description : req.body.description,
            quantity : req.body.quantity,
            status : req.body.status
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }
    
    static delete(req,res,next){
        Product.deleteOne({
            _id : req.params._id
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }
}

module.exports = productController
