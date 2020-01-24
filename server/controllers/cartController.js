const Cart = require('../models/cart')

class CartController{
    static create(req,res,next){
        
        Cart.findOne({UserId: req.payload._id, productId: req.params.productId}).populate('Product')
        .then(cart=>{
            if(cart){
                console.log(cart.Quantity,'_________',parseInt(req.body.Quantity))
                console.log(cart,'cart yang di update')
                return Cart.findOneAndUpdate({
                    UserId: req.payload._id, 
                    productId: req.params.productId
                },{
                    $set: {Quantity: cart.Quantity+ parseInt(req.body.Quantity)}
                }).populate('Product')
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
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static findAll(req,res,next){
        Cart.find({UserId: req.payload._id}).populate('Product')
        .then(carts=>{
            console.log(carts)
            res.status(200).json(carts)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static update(req,res,next){
        Cart.findOneAndUpdate({UserId: req.payload, productId: req.body.productId}).populate('Product')
        .then(obj=>{
            console.log(obj,'find product in cart products')
            if(obj){

            }else{
                console.log(obj,'di increment')
                obj.push()
                res.json({
                    obj,
                    message: 'berarti belum ada produknya'
                })
            }
            
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static deleteCart(req,res,next){
        Cart.remove({ UserId: req.payload._id, _id: { $in: req.headers.cartList } })
        .then(()=>{
            console.log('deleted')
            res.status(200).json({
                message: 'cart is deleted'
            })
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
}

module.exports = CartController