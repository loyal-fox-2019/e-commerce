const router = require('express').Router()
const transactionController = require('../controllers/TransactionController')
const {authenticate, authorizeTransaction} = require('../middlewares/auth')

router.use(authenticate)
router.put('/:id', authorizeTransaction, transactionController.update)
router.get('/', transactionController.getAll)

module.exports = router