const Cart = require('../models/cart')
const Item = require('../models/item')

class CartCtr {
    static create(req, res, next) {
        let id = req.params.id
        let user = req.user
        let quantity = Number(req.body.quantity)

        Item.findById(id)
        .then((item) => {
            let checkStock = item.stock - quantity
            if (checkStock >= 0) {
                Cart.create({
                    item_id : item._id,
                    quantity,
                    user_id : user._id
                })
                .then(() => {
                    res.status(200).json({
                        message: "item added to cart!",
                        item,
                        user,
                        quantity
                    })
                })
            } else {
                res.status(400).json({
                    message: "out of stock!"
                })
            }
        })
        .catch(next)
    }

    static read(req, res, next) {
        
    }
}

module.exports = CartCtr