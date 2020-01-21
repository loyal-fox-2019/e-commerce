const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const cartRouter = require('./cart-router')
const itemRouter = require('./item-router')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server alive!' })
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/items', itemRouter)
router.use('/carts', cartRouter)

module.exports = router
