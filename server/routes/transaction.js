const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/sell',transactionController.sell)
router.get('/buy',transactionController.buy)
router.get('/',transactionController.get)
router.put('/:id',transactionController.updateStatus)

module.exports = router