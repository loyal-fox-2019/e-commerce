const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const cartRouter = require('./cart-router')
const itemRouter = require('./item-router')
const transactionRouter = require('./transaction-router')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server alive!' })
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/items', itemRouter)
router.use('/carts', cartRouter)
router.use('/transactions', transactionRouter)

module.exports = router
