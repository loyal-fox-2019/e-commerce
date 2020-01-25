const Cart = require('../models/cart')

class CartController{
    static create(req,res,next){
        Cart.findOne({UserId: req.payload._id, productId: req.params.productId, isCheckOut: false}).populate('productId')
        .then(cart=>{
            if(cart){
                console.log(cart.Quantity,'_________',parseInt(req.body.Quantity))
                console.log(cart,'cart yang di update')
                return Cart.findOneAndUpdate({
                    UserId: req.payload._id, 
                    productId: req.params.productId
                },{
                    $set: {Quantity: cart.Quantity+ parseInt(req.body.Quantity)}
                }).populate('productId')
            }else{
                return Cart.create({
                    UserId: req.payload._id,
                    productId: req.params.productId,
                    Quantity: req.body.Quantity,
                    isCheckOut: false
                })
            }
        })
        .then(result=>{
            console.log(result, 'result update dan create')
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static findAll(req,res,next){
        Cart.find({UserId: req.payload._id, isCheckOut: false}).populate('productId')
        .then(carts=>{
            // console.log(carts)
            res.status(200).json(carts)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static deleteCart(req,res,next){
        Cart.findOneAndDelete({_id: req.params.cartId})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static checkOutCart(req,res,next){
        req.body.cartList.forEach(item=>{
            Cart.findOneAndUpdate(item, {$set: { isCheckOut: true }})
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(400).json(err)
            })
        })
    }
}

module.exports = CartController