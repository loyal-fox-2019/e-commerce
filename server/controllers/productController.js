const Product = require('../models/products')

class ProductController{
    static findAll(req,res,next){
        Product.find()
          .then(result=>{
            res.status(200).json(result)
          })
          .catch(err=>{
            res.status(400).json(err)
          })
    }
    static findAllbyUser(req,res,next){
      // console.log(req.payload)
        Product.find({UserId: req.payload._id})
        .then(result=>{
          // console.log(result)
          res.status(200).json(result)
        })
        .catch(err=>{
          res.status(400).json(err)
        })
    }
    static create(req,res,next){
        console.log(req.body, 'di create', req.payload)
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            picture: req.body.picture,
            stock: req.body.stock,
            UserId: req.payload._id
          })
          .then(result=>{
            // const {_id, name, description, price, picture,createdAt,stock, seller} = result
            console.log(result, 'ini result')
            res.status(201).json(result)
          })
          .catch(err=>{
            console.log(err)
            res.status(400).json(err)
          })
    }
    static findOne(req,res,next){
      // console.log('find one')
        Product.findOne({_id: req.params.productId})
          .then(product=>{
            // console.log(product, 'find one')
            res.status(200).json(product)
          })
          .catch(err=>{
            res.status(400).json(err)
          })
    }
    static delete(req,res,next){
        Product.findOneAndDelete({_id: req.params.productId})
          .then(res=>{
            res.status(200).json({
              message: 'product deleted'
            })
          })
          .catch(err=>{
            res.status(200).json(err)
          })
    }
    static update(req,res,next){
        Product.findByIdAndUpdate({
            _id: req.params.productId
          },
          {
            name: req.body.name,
            description: req.body.description,
            picture: req.body.picture,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.payload._id
          })
          .then(result=>{
            // console.log(result, 'update route')
            res.status(200).json(result)
          })
          .catch(err=>{
            res.status(400).json(err)
          })
      }
}

module.exports = ProductController