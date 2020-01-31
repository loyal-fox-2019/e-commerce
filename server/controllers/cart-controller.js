const cart_model = require('../models/cart-model')
const transaction = require('../models/transaction-model')


class Cart{
    static history(req,res,next){
        transaction.find().populate('userId')
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static historyuserconfirm (req,res, next){
        transaction.updateOne({'_id': req.params.id, userId: req.data.userid}, {delivery: true})
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((Err)=>{
            next()
        })
    }

    static historyuser(req,res,next){
        transaction.find({delivery: false, userId: req.data.userid}).populate('inventoryId')
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static create(req,res,next){
        let input = {
            amount: req.body.amount,
            user: req.data.userid,
            inventory: req.body.inventory,
            date_add: new Date()
        }
        cart_model.findOne({inventory: req.body.inventory})
        .then((data)=>{
            if(data == null){
                return cart_model.create(input)
            } else{
                return cart_model.updateOne({inventory:req.body.inventory, user: req.data.userid}, 
                    {amount: Number(data.amount)+Number(req.body.amount)})
            }
        })
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static deleteCart(req,res,next){
        cart_model.deleteOne({'_id': req.params.id, user: req.data.userid})
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static findall(req,res,next){
        cart_model.find({user: req.data.userid}).populate('inventory')
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static checkout(req,res,next){
        let data = []
        let carts = []
        req.body.checkout.forEach(element => {
            carts.push(cart_model.findOne({'_id':element}))
        })
        req.body.checkout.forEach(element => {
            data.push(cart_model.remove({'_id': element}))
        });
        Promise.all(carts)
        .then((datas)=>{
            carts = datas
            return Promise.all(data)
        })
        .then((data)=>{
            let tmp = []
            for (let i = 0; i<carts.length; i++){
                let input = {
                    cartId: carts[i]._id,
                    inventoryId: carts[i].inventory,
                    userId: carts[i].user,
                    amount: carts[i].amount,
                    date_add: carts[i].date_add,
                    date_checkout: new Date (),
                    delivery: false
                }
                tmp.push(input)
            }
            return transaction.insertMany(tmp)
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })

    }

}


module.exports = Cart