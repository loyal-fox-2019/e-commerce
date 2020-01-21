const router = require('express').Router()
const Product = require('../models/products')
const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/gcs-upload')
const ProductController = require('../controllers/productController')

router.get('/products', authentication, function(req,res){
  Product
    .find()
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})

router.post('/products', authentication, upload.single('picture'), function(req,res){
  // console.log(req.body)
  Product
    .create({
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
})

router.get('/products/:id', authentication, (req,res,next)=>{
  Product
    .findOne({_id: req.params.id})
    .then(product=>{
      // console.log(product)
      res.status(200).json(product)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})

router.delete('/products/:id', authentication, (req,res,next)=>{
  Product
    .findOneAndDelete({_id: req.params.id})
    .then(res=>{
      res.status(200).json({
        message: 'product deleted'
      })
    })
    .catch(err=>{
      res.status(200).json(err)
    })
})

router.patch('/products/:id', authentication, upload.single('picture'), (req,res,next)=>{
  Product
    .findByIdAndUpdate({
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
})

module.exports = router

