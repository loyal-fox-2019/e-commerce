'use strict';

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Cart = require('./models/cart');

mongoose.connect('mongodb://localhost:27017/e-comm-integration-' + process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/cart', function(req, res, next) {
    const { ProductId,
        UserId,
        date_cart,
        quantity,
        sale_price,
        discount,
        sub_total } = req.body;

    Cart
    .create({
        ProductId,
        UserId,
        date_cart,
        quantity,
        sale_price,
        discount,
        sub_total
    })
    .then(function(cart) {
        res.status(201).json(cart);
    })
    .catch(next);
})

app.delete('/cart:id', function(req, res, next) {
    Cart
    .deleteOne({
        _id: req.params.id
    })
    .then((response) => {
        res.status(200).json(response);
    })
    .catch(next);
})

module.exports = app;