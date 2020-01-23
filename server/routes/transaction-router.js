const router = require('express').Router()
const TransactionController = require('../controllers/transaction-controller')
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)
router.post('/', TransactionController.createTransaction)
router.patch('/', TransactionController.updateTransaction)

module.exports = router
