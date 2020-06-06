'use strict';

const Cart = require('../models/cart');

class CartController {
    static create(req, res, next) {
        const { ProductId, quantity, sale_price, sub_total } = req.body;
        const UserId = req.userLoggedIn.user._id;
        Cart.findOne({ ProductId, UserId})
        .then((cart) => {
            if(!cart) {
                return Cart.create({
                    ProductId,
                    UserId,
                    date_cart: new Date,
                    quantity,
                    sale_price,
                    sub_total,
                    status: 'process'
                })
                .then(resCreate => {
                    res.status(200).json({ create: resCreate });
                })
            } else {
                let incQty = cart.quantity + 1;
                return Cart.findOneAndUpdate(
                    {
                        ProductId,
                        UserId,
                    },
                    {
                        quantity: incQty,
                        sub_total: incQty * sale_price
                    }
                )
                .then(resUpdate => {
                    res.status(200).json({ update: resUpdate });
                })
            }
        })
        .catch(next)
    }

    static deleteMany(req, res, next) {
        const UserId = req.userLoggedIn.user._id;
        Cart.deleteMany({ UserId })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(next);
    }

    static deleteOne(req, res, next) {
        const id = req.params.id;
        Cart.deleteOne({ _id: id })
        .then((response) => {
            res.status(200).json(response)
        })
        .catch(next);
    }

    static find(req, res, next) {
        const UserId = req.userLoggedIn.user._id;
        Cart.find({ UserId }).populate('ProductId')
        .then(carts => {
            res.status(200).json(carts);
        })
        .catch(next);
    }
}

module.exports = CartController;