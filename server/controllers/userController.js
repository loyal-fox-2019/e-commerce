const User = require('../models/userModel');
const {comparer} = require('../helpers/bcrypt');
const {tokenGenerator} = require('../helpers/jwt');

class UserController{
    static register(req,res,next){
        if(req.body.email === 'admin@hacktivshop.com'){
            next('invalid-admin')
            return
        }
        
        User.create(req.body)
        .then(response => {
            const token = tokenGenerator(req.body)
            res.status(201).json({token, user : req.body.email})
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static login(req,res,next){
        User.findOne({
            email : req.body.email
        })
        .then(response => {
            console.log('account found')
            console.log(response)
            if(response){
                if(!comparer(req.body.password,response.password)){
                    next('invalid-password')
                }
                else{
                    const token = tokenGenerator(req.body)
                    res.status(201).json({token, user : req.body.email})
                }
            }
            else{
                next('invalid-registered')
            }
        })
        .catch(err => {
            next(500)
        })
    }
    
    static findOne(req,res,next){
        console.log(req.body)
        User.findOne({
            email : req.body.user
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => console.log(err))
    }

    static addToCart(req,res,next){
        console.log('masuk ke addtocart')

        User.find({
            email : req.params.email,
            cart : {
                $elemMatch : {
                    name : req.body.name
                }
            }
        })
        .then(response =>{
            res.send(response)
            req.body.quantity = parseInt(req.body.quantity)
            if(response.length === 0){
                console.log('masuk ke push item baru')
                User.findOneAndUpdate({
                    email : req.params.email
                },{
                    $push: {
                        cart : req.body
                    }
                })
                .then(response => {
                    console.log("added to cart for "+req.params.email)
                    console.log(response)
                    res.status(201).json(response)
                })
                .catch(err => {
                    console.log("failed adding a product to cart for "+req.params.email)
                    console.log(err)
                    next(400)
                })
            } else {
                console.log("masuk ke update")
                User.update({
                    'cart.name' : req.body.name
                }, {
                    $inc : {
                        'cart.$.quantity' : 1
                    }
                })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    }

    static deleteFromCart(req,res,next){
        User.update({
            email : req.params.email
        },{
            "$pull" : {
                "cart" : {
                    "name" : req.body.name
                }
            }
        },{
            safe: true,
            multi:true
        })
        .then(response => {
            res.status(200).json('Deleted product from cart')
            console.log(response)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }

    static emptyCart(req,res,next){
        User.findOneAndUpdate({
            email : req.params.email
        },
        {
            cart : []
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }
}

module.exports = UserController
