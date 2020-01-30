//models
const Transaction = require('../models/Transaction')
const User = require('../models/User')
const Item = require('../models/Item')

class TransactionCon {
    static   create(req,res,next){
        User.findOne({
            _id: req.user._id
        })
        .populate('cart.item_id')
        .then(data=>{
            data.cart.forEach(async element => {
                let stockNow = element.item_id.stock - element.quantity
                if(stockNow >= 0){
               await Transaction.create({
                    customer: req.user._id,
                    item: element.item_id._id,
                    seller: element.item_id.seller,
                    quantity: element.quantity
                })
                await Item.updateOne({
                        _id: element.item_id._id
                    },{
                        stock: stockNow
                    })
                }
            });
            data.cart = []
            return data.save({
                validateBeforeSave: false
            })
        })
        .then(respone =>{
            res.status(200).json({
                message: 'create transaction success !'
            })
        })
        .catch(next)
    }

    static findAll(req,res,next){
        Transaction
            .find({
                $or: [
                    {customer : req.user._id},
                    {seller: req.user._id }
                ]
            })
            .populate({
                path: 'item',
                populate : {path: 'seller'}
            })
        .then(data => {            
            res.status(200).json(data)
        })
        .catch(next)
    }

    static findOne(req,res,next){
        Transaction.findOne({
            _id : req.params.id
        })
        .then(item => {
                res.status(200).json(item)
        })
        .catch(next)
    }

    static remove(req,res,next){
        Transaction.deleteOne({ _id : req.params.id})
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(next)
    }
    
    static updateStatus(req,res,next){
        Transaction.updateOne({
            _id: req.params.id },{
            status : true    
        })
        .then(respone=>{
            res.status(200).json(respone)
        })
        .catch(next)
    }
}

module.exports = TransactionCon