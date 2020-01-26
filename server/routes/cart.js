const router = require('express').Router()
const CartController = require('../controllers/cartController')
const Authenticate = require('../middlewares/authenticate')
const Authorize = require('../middlewares/authorization')

router.post('/', Authenticate, Authorize, CartController.addCart)
router.get('/:id', Authenticate, CartController.getCart)
router.delete('/:id', Authenticate, CartController.deleteCart)
router.post('/transaction/:id', Authenticate, CartController.checkoutCart)
router.get('/transaction', Authenticate, Authorize, CartController.allTransaction)

module.exports = router