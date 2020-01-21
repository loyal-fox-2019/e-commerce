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

    }
    static create(req,res,next){
        // console.log(req.body)
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            picture: req.body.picture,
            stock: req.body.stock,
            seller: req.payload._id
          })
          .then(result=>{
            const {_id, name, description, price, picture,createdAt,stock, seller} = result
            res.status(201).json({
              _id,
              name,
              description,
              picture,
              price,
              createdAt,
              stock,
              seller
            })
          })
          .catch(err=>{
            // console.log(err)
            res.status(400).json(err)
          })
    }
    static findOne(req,res,next){
        Product.findOne({_id: req.params.id})
          .then(product=>{
            // console.log(product)
            res.status(200).json(product)
          })
          .catch(err=>{
            res.status(400).json(err)
          })
    }
    static delete(req,res,next){
        Product.findOneAndDelete({_id: req.params.id})
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
            _id: req.params.id
          },
          {
            name: req.body.name,
            description: req.body.description,
            picture: req.body.picture,
            price: req.body.price,
            stock: req.body.stock
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