const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const { generateJWT, verifyJWT } = require('../helpers/jwt')
const ProductModel = require('../models/product')

class UserController {
    static register(req,res,next){
        let {name,email,password} = req.body
        UserModel.create({
            name,
            email,
            password
        })
        .then(result=>{
            let payload = {
                userId: result._id,
                name: result.name,
                email: result.email
            }
            let token = generateJWT(payload)
            res.status(201).json({token, userId: payload.userId, username: payload.name})
        })
        .catch(err=>{
            let errors = []
            for(let key in err.errors){
                errors.push(err.errors[key].message);          
            }
            res.status(400).json({errors})
        })
    }

    static glogin(req,res,next){
        let userData = {
            name: req.user.name,
            email: req.user.email,
            profpic: req.user.picture,
            password: process.env.DEFAULT_PASS
        }
        UserModel.findOne({
            email: userData.email
        })
        .then(user=>{
            if(user){
                return user
            }
            else {
                return UserModel.create(userData)
            }
        })
        .then(result=>{
            let payload = {
                userId: result._id,
                name: result.name,
                email: result.email
            }
            let token = generateJWT(payload)
            res.status(200).json({token, userId: payload.userId, username: payload.name})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static login(req,res,next){
        UserModel.findOne({
            email: req.body.email
        })
        .then(result=>{
            if(!result){
                res.status(400).json({message: "Wrong email/password"})
            }
            else {
                if(bcrypt.compareSync(req.body.password, result.password)){
                    let payload = {
                        userId: result._id,
                        name: result.name,
                        email: result.email
                    }
                    let token = generateJWT(payload)
                    res.status(200).json({token, userId: payload.userId, username: payload.name})
                }
                else {
                    res.status(400).json({message: "Wrong email/password"})
                }
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static addPic(req,res,next) {
        UserModel.findByIdAndUpdate(req.user.userId, {
            profpic: req.body.profpic
        })
        .then(result=>{  
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static getUserData(req,res,next) {
        UserModel.findById(req.user.userId).populate('cart.item').select("-password")
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static checkout(req,res,next) {
        let cart = req.body.cart
        let promises = []
        for(let obj of cart) {
            promises.push(ProductModel.findById(obj.item._id))
        }
        Promise.all(promises)
        .then(results=>{
            let stockPromises = []
            for(let i=0; i<results.length; i++) {
                if(cart[i].quantity > results[i].stock){
                    throw {
                        code: 400,
                        message: `"${results[i].name}" stock is not enough`
                    }
                }
                else {
                    stockPromises.push(ProductModel.findByIdAndUpdate(results[i]._id, {
                        stock: (results[i].stock - cart[i].quantity)
                    }))
                }
            }
            return Promise.all(stockPromises)
        })
        .then(done=>{
            return UserModel.findByIdAndUpdate(req.user.userId, {
                cart: []
            })
        })
        .then(finish=>{
            res.status(200).json({
                message: 'Checkout success'
            })
        })
        .catch(err=>{
            res.status(err.code).json({
                message: err.message
            })
        })
    }

    static removeCart(req,res,next) {
        UserModel.findByIdAndUpdate(req.user.userId, {
            $pull: {
                cart: {
                    _id: req.body.cartData._id
                }
            }
        })
        .then(()=>{
            res.status(200).json({
                message: `${req.body.cartData.item.name} removed from cart`
            })    
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static replaceCart(req,res,next) {
        ProductModel.findById(req.body.cartData.item._id)
        .then(product=>{
            if(req.body.newQuantity < 1) {
                throw {
                    code: 400,
                    message: "Minimum purchase quantity is 1"
                }
            }
            if(product.stock < req.body.newQuantity) {
                throw {
                    code: 400,
                    message: "Product stock not enough for your purchase quantity"
                }
            }
            else {
                return UserModel.findById(req.user.userId).select('-password')
            }
        })
        .then(user=>{
            let newCart = user.cart
            for(let obj of newCart) {
                if(String(obj._id) === req.body.cartData._id) {
                    obj.quantity = req.body.newQuantity
                }
            }
            return UserModel.findByIdAndUpdate(req.user.userId, {cart: newCart})
        })
        .then(()=>{
            res.status(200).json({
                message: 'Cart item quantity updated'
            })
        })
        .catch(err=>{
            res.status(err.code).json({
                message: err.message
            })
        })
    }

    static addCart(req,res,next) {
        let productStock
        ProductModel.findById(req.body.item)
        .then(product=>{
            if(req.body.quantity < 1) {
                throw {
                    code: 400,
                    message: "Minimum purchase quantity is 1"
                }
            }
            if(product.stock < req.body.quantity) {
                throw {
                    code: 400,
                    message: "Product stock not enough for your purchase quantity"
                }
            }
            else {
                productStock = product.stock
                return UserModel.findById(req.user.userId)
            }
        })
        .then(user=>{
            let inCart = false
            let newCart = user.cart
            for(let obj of newCart) {
                if(String(obj.item) === req.body.item) {
                    if((obj.quantity + parseInt(req.body.quantity)) > productStock) {
                        throw {
                            code: 400,
                            message: `${obj.quantity} of the products already exist in cart and adding ${req.body.quantity} more exceeds product's stock`
                        }
                    }
                    else {
                        obj.quantity += parseInt(req.body.quantity)
                        inCart = true
                        break;
                    }
                }
            }
            if(!inCart) {
                return UserModel.findByIdAndUpdate(req.user.userId, {
                    $push: {
                        cart: {
                            item: req.body.item,
                            quantity: req.body.quantity
                        }
                    }
                })
            }
            else {
                return UserModel.findByIdAndUpdate(req.user.userId, {cart: newCart})
            }
        })
        .then(updated=>{
            res.status(200).json({
                message: 'Item added to cart successfully'
            })
        })
        .catch(err=>{
            res.status(err.code).json({
                message: err.message
            })
        })
    }
}

module.exports = UserController