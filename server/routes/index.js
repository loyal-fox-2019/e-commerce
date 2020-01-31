'use strict'

const router = require('express').Router(),
      users = require('./users'),
      products = require('./products'),
      transactions = require('./transactions'),
      cart = require('./cart'),
      { authentication } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.status(200).send('Welcome to e-commerce website!')
})

router.all('*', function(req, res, next) {
  let path = req.url.split('/')[1]
  if (req.url !== '/' && path !== 'users' && path !== 'products' && path !== 'cart' && path !== 'transactions') {
    res.status(404).json({
      message: "Not found"
    });
  } else {
    next()
  }
})

router.use('/users', users)
router.use('/products', products)
router.use(authentication)
router.use('/cart', cart)
router.use('/transactions', transactions)

module.exports = router