const Cart = require('../models/Cart')
class CartController {
    static create(req, res, next){
        Cart
            .create({
                product: req.body.product,
                amount: req.body.amount,
                customer: req.userId
            })
            .then(cart => {
                res.status(201).json(cart)
            })
            .catch(next)
    }

    static delete(req, res, next){
        Cart
            .deleteOne({
                _id: req.params._id
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(next)
    }
}
module.exports = CartController