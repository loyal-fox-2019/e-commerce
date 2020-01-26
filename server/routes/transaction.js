const express = require('express')
const router = express.Router()
const Transaction = require('../controllers/transactionController')
const auth = require('../middlewares/auth')

router.post('/:productId', auth.authentication, Transaction.createTransaction)
router.get('/user', auth.authentication, Transaction.getUserTransaction)

router.get(
  '/',
  auth.authentication,
  auth.adminOnly,
  Transaction.getAllTransaction
)

router.patch(
  '/:transactionId',
  auth.authentication,
  auth.adminOnly,
  Transaction.update
)

module.exports = router
