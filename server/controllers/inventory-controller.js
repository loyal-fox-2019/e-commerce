const Inventory_model = require('../models/inventory-model')

class Inventory{
    static create(req,res,next){
        let input  = {
            name: req.body.name, 
            stock: req.body.stock,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image,
            admin: req.data.userid,
            price: req.body.price
        }
        Inventory_model.create(input)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            if(err.errors.price.message){
                next({errorCode: 400})
            }
            next()
        })
    }

    static findadmin(req,res,next){
        Inventory_model.find().populate('admin')
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }

    static find(req,res,next){
        if(req.params.id == 'all'){
            Inventory_model.find().populate('admin')
            .then((data)=>{
                res.status(200).json(data)
            })
        } else {
            Inventory_model.find({category: req.params.id})
            .then((data)=>{
                res.status(200).json(data)
            })
        }
    }

    static findone(req,res,next){
        Inventory_model.findById(req.params.id)
        .then((Data)=>{
            res.status(200).json(Data)
        })
        .catch((err)=>{
            next(err)
        })
    }

    static delete(req,res,next){
        Inventory_model.deleteOne({
            '_id': req.params.id
        })
        .then((data)=>{
            res.status(200).json({message: 'success delete a inventory'})
        })
        .catch((err)=>{
            next(err)
        })
    }

    static update(req,res,next){
        req.body.admin = req.data.userid
        Inventory_model.updateOne({
            '_id': req.params.id
        }, req.body)
        .then((data)=>{
            return Inventory_model.findById(req.params.id)
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next(err)
        })
    }

    static addCart (req,res,next){
        let count = null
        Inventory_model.findById(req.params.id)
        .then((data)=>{
            if(data.stock > req.body.addCart){
                count = data.stock - req.body.addCart
                return Inventory_model.updateOne({'_id': req.params.id},{stock: count})
            }
        })
        .then((data)=>{
            return Inventory_model.findById(req.params.id)
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            next()
        })
    }
}


module.exports = Inventory