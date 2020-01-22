const cart = require('../models/cart')

class CartController {

    static generateCart(req, res, next){
        // console.log('INI LOGGEDUSER', req.loggedUser);
        
        cart.create({
            userId : req.loggedUser.id,
            productList: []
        })
        .then(createdCart=>{
            res.status(201).json(createdCart)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    static deleteCart(req, res, next){
        cart.deleteOne({
            userId : req.loggedUser.id
        })
        .then(deletedCart=>{
            if(deletedCart.deletedCount == 1){
                res.status(200).json({message:'Successfully deleted cart'})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

}

module.exports = CartController