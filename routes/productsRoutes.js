const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Product = require('../models/products')
const authentication = require('../middlewares/authentication')


mongoose.connect('mongodb://localhost:27017/ecommerce_'+process.env.NODE_ENV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/products', authentication, function(req,res){
  Product
    .find()
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
})

app.post('/products', authentication, function(req,res){
  // console.log(req.body)
  Product
    .create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      picture: req.body.picture,
      stock: req.body.stock
    })
    .then(result=>{
      const {_id, name, description, price, picture,createdAt,stock} = result
      res.status(201).json({
        _id,
        name,
        description,
        picture,
        price,
        createdAt,
        stock
      })
    })
    .catch(err=>{
      // console.log(err)
      res.status(400).json(err)
    })
})

app.get('/products/:id', authentication, (req,res,next)=>{
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

app.delete('/products/:id', authentication, (req,res,next)=>{
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


module.exports = app

