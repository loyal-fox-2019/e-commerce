"use strict"

const User = require('../models/User')
const { checkPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { email, password, username, phone } = req.body
        User.create({
            username,
            email,
            password,
            phone,
            role: "customer"
        })
            .then((user) => {
                const token = createToken(user)
                res.status(201).json({ user, token })
            }).catch((err) => {
                next(err)
            })
    }
    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                const { _id, email, username, phone, password, role, cartList } = user
                if (user === null) {
                    next({
                        status: 400,
                        message: "email/password wrong"
                    })
                } else {
                    const check = checkPassword(req.body.password, user.password)
                    console.log(check);
                    if (!check) {
                        next({
                            status: 400,
                            message: "email/password wrong"
                        })
                    } else {
                        const token = createToken(user)
                        console.log({ user, token });
                        res.status(200).json({
                            user: {
                                _id,
                                username,
                                email,
                                password,
                                phone,
                                role,
                                cartList
                            },
                            token
                        })
                    }
                }
            }).catch((err) => {
                next(err)
            });
    }

    static addCart(req, res, next) {
        let { itemId, quantity } = req.body
        let cartQuantity
        let isDuplicate = false
        if (!itemId || !quantity) {
            res.status(400).json({ message: 'bad request' })
        } else {
            User.findOne({ _id: req.user._id })
                .populate('cart.itemId')
                .then(user => {
                    user.cartList.forEach(item => {
                        if (item.itemId._id == itemId) {
                            cartQuantity = item.quantity
                            isDuplicate = true
                        }
                    })
                    if (isDuplicate) {
                        const totalQuantity = Number(cartQuantity) + Number(quantity)
                        User.updateOne({ _id: req.user._id, 'cartList.itemId': itemId }, { $set: { 'cartList.$.quantity': totalQuantity } })
                            .then(result => {
                                res.status(200).json(result)
                            })
                            .catch(next)
                    } else {
                        let newItem = {
                            itemId,
                            quantity
                        }
                        User.updateOne({ _id: req.user._id }, { $push: { cartList: newItem } })
                            .then(result => {
                                res.status(200).json(result)
                            })
                            .catch(next)
                    }
                })
                .catch(next)
        }
    }

    static findCart(req, res, next) {
        User.findById(req.user._id)
            .populate('cartList.itemId')
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                next(err)
            });
    }

    static deleteCart(req, res, next) {
        const { itemId } = req.body
        if (!itemId) {
            next({
                status: 400,
                message: "bad request"
            })
        } else {
            User.updateOne({
                _id: req.user._id
            }, {
                $pull: { cartList: { itemId } }
            }, { new: true })
                .then((result) => {
                    res.status(200).json(result)
                }).catch((err) => {
                    next(err)
                });
        }
    }

}

module.exports = UserController