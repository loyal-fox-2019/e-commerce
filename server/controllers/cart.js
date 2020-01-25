const cartModel = require('../models/cart');
const productModel = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;

class Cart {
    static getAllCartsOnAuthenticatedUser(req, res, next) {
        cartModel
            .find({
                user: ObjectId(req.userLogin.id)
            }).populate(['product', 'user'])
            .then((carts) => {
                res.status(200).json(carts)
            }).catch(next);
    }

    static filterAuthenticatedCart(req, res, next) {
        cartModel
            .find({
                user: ObjectId(req.userLogin.id),
                product: new RegExp(req.query.product, 'g') || null,
                status: new RegExp(req.query.status, 'g') || null,
            }).populate(['product', 'user'])
            .then((carts) => {
                res.status(200).json(carts)
            }).catch(next);

    }

    static addProductToAuthenticatedCart(req, res, next) {
        const {
            productId
        } = req.params

        const {
            notes,
            stock
        } = req.body

        productModel
            .findOne({
                _id: ObjectId(productId)
            }).populate('seller')
            .then((product) => {
                if (!product) {
                    let err = new Error('Product not found')
                    err.statusCode = 404
                    err.errMessage = 'Product not found'
                    throw err
                } else if (product.seller._id.equals(req.userLogin._id)) {
                    let err = new Error('Cannot put your own product to cart')
                    err.statusCode = 400
                    err.errMessage = 'Cannot put your own product to cart'
                    throw err
                } else {
                    return cartModel
                        .findOne({
                            product: ObjectId(productId),
                            user: ObjectId(req.userLogin.id),
                        })
                }
            }).then((cart) => {
                if (cart) {
                    let err = new Error('Product already in cart')
                    err.statusCode = 400
                    err.errMessage = 'Product already in cart'
                    throw err
                } else {
                    return cartModel
                        .create({
                            product: productId,
                            user: req.userLogin.id,
                            status: 'new',
                            stock,
                            notes
                        })
                }
            }).then((cart) => {
                res.status(201).json(cart)
            })
            .catch(next);
    }

    static updateAuthenticatedCartStockByProductId(req, res, next) {
        cartModel
            .findOne({
                user: ObjectId(req.userLogin.id),
                product: ObjectId(req.params.productId)
            }).populate(['product', 'user'])
            .then((cart) => {
                if (!cart) {
                    let err = new Error('Cart with that product not found')
                    err.statusCode = 404
                    err.errMessage = 'Cart with that product not found'
                    throw err
                } else if (!req.body.stock) {
                    let err = new Error('New stock not found')
                    err.statusCode = 404
                    err.errMessage = 'New stock not found'
                    throw err
                } else if (cart.product.stock < req.body.stock) {
                    let err = new Error('Current product stock is not enough')
                    err.statusCode = 400
                    err.errMessage = 'Current product stock is not enough'
                    throw err
                } else {
                    return cartModel
                        .updateOne({
                            user: ObjectId(cart.user.id),
                            product: ObjectId(cart.product.id)
                        }, {
                            stock: req.body.stock
                        })
                }
            }).then((result) => {
                res.status(200).json({
                    result,
                    message: 'Successfully update stock in your cart'
                })
            }).catch(next);
    }

    static deleteCartByProductId(req, res, next) {
        let deletedCart
        cartModel
            .findOne({
                user: ObjectId(req.userLogin.id),
                product: ObjectId(req.params.productId)
            }).populate(['product', 'user'])
            .then((cart) => {
                if (!cart) {
                    let err = new Error('Product not found in your cart')
                    err.statusCode = 404
                    err.errMessage = 'Product not found in your cart'
                    throw err
                } else {
                    deletedCart = cart
                    return cartModel
                        .deleteOne({
                            user: ObjectId(cart.user._id),
                            product: ObjectId(cart.product._id)
                        })
                }
            }).then((result) => {
                res.status(200).json({
                    result,
                    deletedCart
                })
            })
            .catch(next);
    }
}

module.exports = Cart;