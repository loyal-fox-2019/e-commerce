const Transaction = require('../models/Transaction')
const User = require('../models/User')
const Item = require('../models/Item')
const {checkItemStock} = require('../helpers/checkItemStock')

class TransactionController {
    static async create(req, res, next) {
        try {
            const user = await User.findOne({_id: req.userId})

            if(user.cart.length == 0) throw {
                errorCode: 400,
                message: "Your cart is empty, can't checkout."
            }

            // check if all items stock, meet the user's demand

            const outOfStock = await checkItemStock(user.cart)

            if(outOfStock.length > 0) {
                res.status(400).json({outOfStock})
            }
            else {
                const inputs = {
                    user: req.userId,
                    purchasedItems: user.cart,
                }

                const reduceItemStockPromises = []

                user.cart.forEach(cartItem => {
                    let reduceStockBy = -1 * cartItem.quantity
                    // console.log(reduceStockBy, 'this is reduceStockBy')
                    reduceItemStockPromises.push(Item.updateOne(
                        {_id: cartItem.item},
                        {
                            $inc: {
                                stock: reduceStockBy
                            }
                        }
                    ))
                })

                await Promise.all(reduceItemStockPromises)
                const transaction = await Transaction.create(inputs)

                const clearCartResults = await User.updateOne(
                    {_id: req.userId},
                    {
                        $set: {
                            cart: []
                        }
                    }
                )
                console.log(transaction)
                res.status(201).json({transaction, userUpdate: clearCartResults})
            }
        }
        catch (error) {
            next(error)
        }
    }

    static async read(req, res, next) {
        try {
            const transactions = await Transaction.find()
            res.status(200).json({transactions})
        }
        catch (error) {
            next(error)
        }
    }

    static async readOne(req, res, next) {
        try {
            const transaction = await Transaction.findOne({_id: req.params.id})
                .populate('purchasedItems.item')
            res.status(200).json({transaction})
        }
        catch (error) {
            next(error)
        }
    }

    static async updateDeliverySent(req, res, next) {
        try {
            const {status} = req.body
            const results = await Transaction.updateOne(
                {user: req.userId},
                {
                    $set: {
                        status
                    }
                }
            )

            res.status(200).json({results})
        }
        catch (error) {
            next(error)
        }
    }
}

module.exports = TransactionController