const express = require('express')
const router = express.Router()
const CartController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const cartAuthorization = require('../middlewares/cartAuthorization')

router.use(authentication)


module.exports = router