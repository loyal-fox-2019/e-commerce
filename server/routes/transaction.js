const express = require('express')
const router = express.Router()
const { TransactionController } = require('../controllers')
const authenticate = require('../middlewares/authenticate')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeTransactionOwner = require('../middlewares/authorizeTransactionOwner')

router.use(authenticate)
router.get('/', TransactionController.getUserTransaction)
router.post('/', TransactionController.postTransaction)

router.patch('/:transactionId', authorizeTransactionOwner, TransactionController.confirmTransaction)

router.use(authorizeAdmin)
router.get('/all', TransactionController.showAllTransaction)

module.exports = router
