const User = require('../models/User')

class CartCon {
    static findAll(req,res,next){
        User.findOne({
            _id : req.user._id
        })
            .populate('cart.item_id')
        .then(data =>{
            res.status(200).json(data.cart)
        })
        .catch(next)
    }

    static addCart(req, res, next){
        User.findOne({
            _id : req.user._id
        })
        .then(data =>{
            let cart = data.cart //[{ }]
            let flag = false
            cart.forEach(element => {
                let temp = element.quantity
                if(String(element.item_id) === req.body.item_id){
                    temp = element.quantity + Number(req.body.quantity)
                    flag = true
                }
                if(temp <= 0){
                    temp = element.quantity
                }
                element.quantity = temp
            });

            if(!flag){
                let newCart = {
                    item_id: req.body.item_id,
                    quantity: req.body.quantity
                }
                return User.updateOne({
                    _id: req.user._id
                },{
                    $push : {cart: newCart}
                })
            }else{
                return data.save({
                    validateBeforeSave: false
                })
            }
        })
        .then(respone=>{
            res.status(200).json({
                message: 'item ditambahkan ke cart success!'
            })
        })
        .catch(next)
    }

    static removeItem(req,res,next){
        User.findOne({
            _id : req.user._id
        })  
        .then(data =>{
            let cart = data.cart

            data.cart = cart.filter(element =>
               String(element._id) !== req.body.cart_id
            )

            if(cart.length === data.cart.length){
                next({
                    status: 404,
                    message: 'item not found',
                })
            }else{
                 data.save({
                    validateBeforeSave: false
                })
                res.status(200).json({
                    message: 'delete succsess !'
                })
            }
        })
        .catch(next)
    }
}

module.exports = CartCon