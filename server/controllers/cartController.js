const Cart = require('../models/cart')

class CartController{
    static create(req,res,next){
        Cart.create({
            UserId: req.payload._id,
            productId: req.params.productId,
            Quantity: req.body.Quantity,
            isCheckOut: false
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
    static findOne(req,res,next){
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
        Cart.find({"products.item": req.body.productId, _id: req.params.cartId})
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
    static decrement(req,res,next){
        //perlufind by userid dan product id trus update aja
    }
    static addProduct(req,res,next){
        //perlufind by userid dan product id trus update aja
    }
    static checkoutCart(req,res,next){
        //perlufind by userid dan product id trus update aja
    }
}

module.exports = CartController