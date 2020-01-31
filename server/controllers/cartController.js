const cart = require('../models/cart')
const product = require('../models/product')

class CartController {

    static generateCart(req, res, next){
        // console.log('INI LOGGEDUSER', req.loggedUser);
        cart.findOne({userId: req.loggedUser.id, productId: req.body.productId}).populate('productId', 'stock')
        .then(cartData => {
            if(!cartData) {
                return cart.create({
                    userId : req.loggedUser.id,
                    productId: req.body.productId,
                    qty: req.body.qty
                })
            } else {
                let newQty = cartData.qty + req.body.qty
                if(newQty > cartData.productId.stock){
                    newQty = cartData.productId.stock
                }
                return cart.updateOne({userId: req.loggedUser.id, productId: req.body.productId}, {qty: newQty})
            }
        })
        
        .then(createdCart=>{
            res.status(201).json(createdCart)
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteCart(req, res, next){
        let updateTarget = []
        cart.find({userId: req.loggedUser.id}).populate('productId')
        .then(cartItems=>{
            // console.log('ini CONTROLLER', cartItems)
            cartItems.forEach(element => {
                if(element.productId.stock < element.qty){
                    next(`I'm sorry the item ${element.productId.productName} is out of stock`)
                }else{
                updateTarget.push(product.updateOne({_id:element.productId._id}, {
                    stock : element.productId.stock - element.qty
                }))
            }
            })
            return Promise.all(updateTarget)
        })
        .then(success => {
            return cart.deleteMany({
                userId : req.loggedUser.id
            })
        })
        .then(deletedCart=>{
            if(deletedCart.deletedCount == 1){
                res.status(200).json({message:'Successfully CheckedOut'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteItem(req, res, next){
        cart.deleteOne({
            _id: req.params.id
        })
        .then(deletedCart=>{
            if(deletedCart.deletedCount == 1){
                // res.status(200).json({message:'Successfully deleted cart'})
                return cart.find({userId: req.loggedUser.id}).populate('productId')
            }
        })
        .then(cartItems=>{
            // console.log(cartItems)
            res.status(200).json(cartItems)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getCart(req, res, next){
        cart.find({userId: req.loggedUser.id}).populate('productId')
        .then(cartItems=>{
            // console.log(cartItems)
            res.status(200).json(cartItems)
        })
        .catch(err=>{
            next(err)
        })
    }

}

module.exports = CartController