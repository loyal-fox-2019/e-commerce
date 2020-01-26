'use strict'

const express = require('express')
const router = express.Router()
const { Cart } = require('../controllers')

router.put('/add', Cart.addCart) // search cart or add cart
router.put('/delete', Cart.deleteCart) // delete cart
router.get('/', Cart.readCart)
router.get('/received', Cart.readReceivedCart) // read received Cart
router.get('/sending', Cart.readSendingCart) // read received Cart
router.get('/chekcout', Cart.readProcessCart) // read checkout Cart
router.put('/checkout/:id', Cart.checkout)
router.put('/sending/:id', Cart.sending)
router.put('/received/:id', Cart.received)

module.exports = router