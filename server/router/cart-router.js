const express = require('express')
const router = express.Router()
const cart_controller = require('../controllers/cart-controller')
const verif = require('../middleware/verification')

router.use(verif.authenCustomer)
router.post('/', cart_controller.create)
router.get('/', cart_controller.findall)
router.delete('/:id', cart_controller.deleteCart)
router.post('/checkout', cart_controller.checkout)
router.get('/history',verif.authenAdmin,cart_controller.history)
router.get('/history/user',verif.authenCustomer,cart_controller.historyuser)
router.patch('/history/user/:id',verif.authenCustomer,cart_controller.historyuserconfirm)


module.exports = router