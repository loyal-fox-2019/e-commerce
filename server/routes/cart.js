const express = require('express')
const router = express.Router()
const CartCtr = require('../controllers/cart')
const { verifyToken } = require('../middlewares/authentication')

router.use(verifyToken)
router.post('/:id', CartCtr.create)
router.get('/', CartCtr.read)

module.exports = router