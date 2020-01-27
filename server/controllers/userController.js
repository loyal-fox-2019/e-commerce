const User = require('../models/user')
const Product = require('../models/product')
const Transaction = require('../models/transaction')
const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')

class userController {
    static register ( req,res,next ) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'buyer'
        })
            .then( user => {
                let token = generateToken({id:user._id})
                res.status(201).json({token})
            })
            .catch( next )
    }
    
    static login ( req,res,next ) {
        User.findOne({email: req.body.email})
            .then( user => {
                if( user ) {
                    if( checkPassword( req.body.password,user.password ) ) {
                        let token = generateToken( {id: user._id} )
                        res.status(200).json({token})
                    } else throw { name: 'Wrong Password' }
                } else throw { name: 'User Not Found' }
            })
            .catch( next )
    }

    static getUser ( req,res,next ) {
        if( req.query.product ) {
            Product.find({seller: req.decoded.id})
                .populate('seller')
                .then( products => res.status(200).json(products))
                .catch( next )
        } else {
            User.findOne( {_id: req.decoded.id})
                // .populate('cart.item')
                .populate({
                    path: 'cart.item',
                    populate: {
                        path: 'seller',
                        model: 'User'
                    }
                })
                .then( user => res.status(200).json(user))
                .catch( next )
        }
    }

    static addToCart ( req,res,next ) {
        Product.findById(req.body.productId)
            .then( product => {
                if( product.stock >= req.body.quantity ) {
                    return User.findOne({
                        _id:req.decoded.id,
                        'cart.item':req.body.productId
                    })
                } else {
                    throw { name: 'Stock N'}
                }
            })
            .then( user => {
                if(user) {
                    return User.updateOne({
                        _id:req.decoded.id ,
                        cart: {
                            $elemMatch: {item: req.body.productId}
                        }
                    },{
                        $inc: {
                            'cart.$.quantity':req.body.quantity,
                            'cart.$.total': req.body.total
                        },
                    })
                } else {
                    return User.updateOne({_id:req.decoded.id},{
                        $addToSet: {cart:{
                            item: req.body.productId,
                            quantity: req.body.quantity,
                            total: req.body.total
                        }}
                    })
                }
            })
            .then( result => {
                res.status(201).json(result)
            })
            .catch( err => console.log(err) )
    }

    static deleteItemFromCart ( req,res,next ) {
        console.log(req.params)
        User.findByIdAndUpdate(req.decoded.id,{
            $pull: {cart: {'item': req.params.productId}}
        })
            .then( result => res.status(201).json(result))
            .catch( next )
    }

    static checkout ( req,res,next ) {

        let notCheckOut = []
        let checkedOut = []
        let cart = []
        let temp = []

        // Find the user that owns the cart.

        User.findById(req.decoded.id)
            .populate('cart.item')
            .then( user => {
                cart = user.cart
                cart.forEach( cartItem => {
                    let update = Product.findById(cartItem.item._id)
                    temp.push(update)
                })
                return Promise.all(temp)
            })
            // Check if the stock if enough for checkout, if enough push cart product to checkedOut Arr, else push to notCheckOut Arr.
            .then( datas => {
                temp = []
                for( let data of datas) {
                    for( let product of cart) {
                        if( JSON.stringify(data._id) === JSON.stringify(product.item._id) ) {
                            if( data.stock >= product.quantity ) {
                                let update = Product.findOneAndUpdate({
                                    _id: product.item._id
                                },{
                                    $inc: { stock: -product.quantity }
                                })
                                temp.push(update)
                                checkedOut.push(product)
                            } else {
                                notCheckOut.push(product)
                            }
                        } else {
                        }
                    }
                }

                return Promise.all(temp)
            })
            // Create transactions of all checkedOut items. 
            .then( results => {
                temp = []
                checkedOut.forEach( product => {
                    let update = Transaction.create({
                        seller: product.item.seller,
                        buyer: req.decoded.id,
                        item: product.item._id,
                        quantity: product.quantity,
                        status: 'Waiting for shipping',
                        totalPrice: product.total
                    })
                    temp.push(update)
                })

                return Promise.all(temp)
            })
            // Empty the user cart if everything is checked out else update the cart with notCheckOut value
            .then( datas => {
                return User.findOneAndUpdate({_id:req.decoded.id},{
                    $set: { cart: notCheckOut}
                })
            })
            // Send notCheckOut if there is not checked out item, else send update result
            .then( result => {
                if( notCheckOut.length>0 ) {
                    res.status(201).json({ notCheckOut })
                } else {
                    res.status(201).json( result )
                }
            })
            .catch( next )
    }
}

module.exports = userController