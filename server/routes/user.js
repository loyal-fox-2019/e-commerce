const router = require('express').Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.use(authentication)
router.get('/',userController.getUser)
router.patch('/',userController.addToCart)
router.put('/',userController.checkout)
router.delete('/:productId',userController.deleteItemFromCart)

module.exports = router