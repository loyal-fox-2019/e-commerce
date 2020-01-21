const Cart = require('../models/cart')

class CartController{
    static findOne(req,res,next){
        console.log('find one cart')
        console.log(req.payload)
        Cart.findOne({UserId: req.payload._id}).populate('Cart')
        .then(cart=>{
            console.log(cart)
            res.status(200).json(cart)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static increment(req,res,next){

    }
    static decrement(req,res,next){

    }
    static addProduct(req,res,next){

    }
    static checkoutCart(req,res,next){

    }
}

module.exports = CartController