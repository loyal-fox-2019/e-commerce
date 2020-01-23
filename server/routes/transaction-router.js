const router = require('express').Router()
const TransactionController = require('../controllers/transaction-controller')
const { authenticate, authorizeAdmin } = require('../middlewares/auth')

router.use(authenticate)
router.post('/', TransactionController.createTransaction)
router.patch('/', TransactionController.updateTransaction)
router.use(authorizeAdmin)
router.delete('/', TransactionController.deleteTransaction)

module.exports = router
