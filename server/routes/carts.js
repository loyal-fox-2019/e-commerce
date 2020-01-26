const router = require('express').Router()
const CartController = require('../controllers/CartController')

router.get('/', CartController.findALl)
router.post('/', CartController.login)
router.post('/checkout', CartController.checkout)
router.delete('/'. CartController.delete)

module.exports = router