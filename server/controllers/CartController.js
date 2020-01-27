'use strict';

const Cart = require('../models/cart');
const jwt= require('../helper/jwt');

class CartController {
    static read(req, res, next) {
        const payload = jwt.verifyToken(req.headers.token);
        Cart.find({userId: payload.id, status: false}).populate('productId')
        .then(carts => {
            res.status(200).json({
                message: 'OK',
                data: carts
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static create(req, res, next) {
        const payload = jwt.verifyToken(req.headers.token);
        const newCart = {
            productId: req.body.productId,
            amount: req.body.amount,
            userId: payload.id,
        }
        Cart.create(newCart)
        .then(cart => {
            res.status(201).json({
                message: 'Cart Item has been successfully created',
                data: cart
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static delete(req, res, next) {
        Cart.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: 'Cart Item has been successfully delete',
                data: result
            })
        })
        .catch(error => {
            next(error);
        })
    }
}

module.exports = CartController;