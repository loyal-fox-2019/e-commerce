const Product = require('../models/product')

class productController {
    static create ( req,res,next ) {
        Product.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            seller: req.decoded.id
        })
            .then( product => {
                res.status(201).json(product)})
            .catch( next )
    }

    static get ( req,res,next ) {
        Product.find()
        .populate('seller')
            .then( products => res.status(200).json(products))
            .catch( next )
    }

    static getOne ( req,res,next ) {
        Product.findOne({_id: req.params.id})
            .then( product => res.status(200).json(product))
            .catch( next )
    }
    
    static delete ( req,res,next ) {
        Product.deleteOne({_id: req.params.id})
            .then( result => res.status(201).json(result))
            .catch( next )
    }

    static update ( req,res,next ) {
        Product.updateOne({_id: req.params.id},{
            $set:{
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock
            }
        },{runValidators: true})
            .then( result => res.status(201).json(result))
            .catch( next )
    }
}

module.exports = productController