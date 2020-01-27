'use strict'

const Cart = require('../models/cart')
const Product = require('../models/product')
const Transaction = require('../models/transaction')
const axios = require("axios")

class Controller {
    static getCart(req, res, next) {
        Cart
            .find({ userId: req.user.id })
            .populate('productId')
            .populate('userId')
            .then((userCart) => {
                res.status(200).json(userCart)
            })
            .catch(next)
    }

    static deleteCartItem(req, res, next) {
        Cart
            .findById(req.params.cartId)
            .populate('userId')
            .populate('productId')
            .then((foundCart) => {
                let productId = foundCart.productId._id
                let stockCart = foundCart.stock
                let stockProduct = foundCart.productId.stock
                let stock = stockProduct + stockCart
                return Product.findByIdAndUpdate(productId, {
                    stock
                })
            })
            .then(() => {
                return Cart.findByIdAndDelete(req.params.cartId)
            })
            .then((deletedCart) => {
                res.status(200).json({
                    deletedCart,
                    message: 'Success Deleted Item Cart On Cart'
                })
            })
            .catch(next)
    }

    static checkoutCart(req, res, next) {
        const { price, address } = req.body
        Cart
            .find({ userId: req.user.id })
            .populate('productId')
            .populate('userId')
            .then((userCart) => {
                let cart = userCart
                return Transaction.create({
                    cart,
                    userId: req.user.id,
                    price,
                    address
                })
            })
            .then((createdTransaction) => {
                return Cart.deleteMany({ userId: createdTransaction.userId })
            })
            .then(() => {
                res.status(200).json({
                    message: "Success Created New Transaction"
                })
            })
            .catch(next)
    }

    static createCartItem(req, res, next) {
        const { stock } = req.body
        const productId = req.params.productId
        console.log(typeof stock)
        Product
            .findById(productId)
            .then((foundProduct) => {
                if (Number(stock) > foundProduct.stock) {
                    res.status(400).json({
                        message: "Current Stock is Not Avaialble"
                    })
                }
                else {
                    let nowStock = foundProduct.stock - Number(stock)
                    return Product.findByIdAndUpdate(productId, {
                        stock: nowStock
                    }, { new: true })
                }
            })
            .then(() => {
                return Cart.findOne({ productId: productId })
            })
            .then((foundCart) => {
                if (foundCart) {
                    let totalStock = foundCart.stock + Number(stock)
                    return Cart.findByIdAndUpdate(foundCart._id, {
                        stock: totalStock
                    }, { new: true })
                }
                else {
                    return Cart.create({
                        userId: req.user.id,
                        productId: productId,
                        stock: Number(stock)
                    })
                }
            })
            .then((createdItemCart) => {
                res.status(201).json({
                    createdItemCart,
                    message: 'Success Added Item to Your Cart'
                })
            })
            .catch(next)
    }

    static async getProvince(req, res) {
        try {
            let { data } = await axios
                .get(`https://api.rajaongkir.com/starter/province`, {
                    headers: { key: '2fbae564574a6d0097adf068e1adf4a5' }
                })
            res.status(200).json(data.rajaongkir.results)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    static async getCities(req, res) {
        try {
            let { data } = await axios.get(`https://api.rajaongkir.com/starter/city`, {
                headers: { key: '2fbae564574a6d0097adf068e1adf4a5' }
            })

            res.status(200).json(data.rajaongkir.results)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async getCosts(req, res) {
        try {
            let { origin, destination, weight, courier } = req.body
            let { data } = await axios.post(
                `https://api.rajaongkir.com/starter/cost`,
                {
                    origin,
                    destination,
                    weight,
                    courier
                },
                {
                    headers: { key: '2fbae564574a6d0097adf068e1adf4a5' }
                }
            )
            res.status(200).json(data.rajaongkir.results[0].costs[0].cost[0].value)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = Controller