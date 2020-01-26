const router = require('express').Router()
const TransactionController = require('../controllers/transaction-controller')
const { authenticate, authorizeAdmin } = require('../middlewares/auth')

router.use(authenticate)
router.get('/', TransactionController.getUserTransactions)
router.post('/', TransactionController.createTransaction)
router.patch('/:transactionId', TransactionController.updateTransaction)
router.use(authorizeAdmin)
router.get('/all', TransactionController.getAllTransactions)
router.delete('/:transactionId', TransactionController.deleteTransaction)

module.exports = router
