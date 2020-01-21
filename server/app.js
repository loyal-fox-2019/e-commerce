const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Product = require('./models/product');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/compress_' + process.env.NODE_ENV, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/products', function(req, res, next) {
  Product
    .find({})
    .then(function(product) {
      res.status(200).json(product);
    })
    .catch(next);
});

app.post('/products', function(req, res, next) {
  Product
    .create(req.body)
    .then(function(product) {
      const {_id, name, price, seller, stock} = product;
      res.status(201).json({
        _id, name, price, seller, stock,
        message: 'Product registered successfully'
      });
    })
    .catch(next);
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: 'Whoa',
  });
});

module.exports = app;