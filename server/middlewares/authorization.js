const Product = require('../models/products')
const Cart = require('../models/cart')

module.exports = (req,res,next)=>{
    if(req.params.hasOwnProperty('productId')){
        Product.findOne({_id: req.params.productId})
        .then(product=>{
            console.log(req.payload._id,'=====', product.UserId)
            if(req.payload._id == product.UserId){
                console.log('ga nyangkut')
                next()
            }else{
                res.status(401).json({
                    message: 'You are not authorized'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    }else if(req.params.hasOwnProperty('cartId')){
        Cart.findOne({_id: req.params.cartId})
        .then(cart=>{
            if(cart.UserId === req.payload._id){
                next()
            }else{
                res.status(401).json({
                    message: 'You are not authorized'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    }
}