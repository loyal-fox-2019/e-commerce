'use strict'

const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const Product = require('../models/product')

class userController {
    static signIn(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then((user) => {
                if (user) {
                    if (compare(req.body.password, user.password)) {
                        const payload = {
                            id: user._id,
                            email: user.email,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            role: user.role
                        }
                        const token = sign(payload)
                        res.status(200).json({
                            token,
                            email: user.email,
                            role: user.role
                        })
                    }
                    else {
                        throw ({ status: 400, message: 'Wrong Email/Password' })
                    }
                }
                else {
                    throw ({ status: 400, message: 'Wrong Email/Password' })
                }
            })
            .catch(next)
    }

    static signUp(req, res, next) {
        let role = 'customer'
        if (req.body.email === 'admin@mail.com') {
            role = 'admin'
        }
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            role
        }
        User
            .create(userData)
            .then((regUser) => {
                res.status(201).json({ regUser, message: 'Thanks for registering' })
            })
            .catch(next)
    }

    static readCart(req, res, next) {
        User
            .findById(req.user.id)
            .then((findOneUser) => {
                res.status(200).json(findOneUser.cart)
            })
            .catch(next)
    }

    static addToCart(req, res, next) {
        const { stock } = req.body
        Product
            .findById(req.params.id)
            .then((findOneProduct) => {
                let stockNow = findOneProduct.stock - Number(stock)
                return Product.findOneAndUpdate({ _id: req.params.id }, { stock: stockNow }, { new: true })
            })
            .then((updatedProduct) => {
                let myCart = {
                    name: updatedProduct.name,
                    stock: Number(stock),
                    price: updatedProduct.price
                }
                return User.findOneAndUpdate({ _id: req.user.id }, { $push: { cart: myCart } }, { new: true })
            })
            .then((updatedUser) => {
                console.log(updatedUser)
                res.status(201).json({
                    updatedUser,
                    message: 'New Product Added'
                })
            })
            .catch(next)
    }

    static checkOutCart(req, res, next) {

    }
}

module.exports = userController