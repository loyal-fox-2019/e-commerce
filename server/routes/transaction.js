const express = require('express')
const router = express.Router()
const Transaction = require('../controllers/transactionController')
const auth = require('../middlewares/auth')

router.post('/:productId', auth.authentication, Transaction.createTransaction)
router.get('/user', auth.authentication, Transaction.getUserTransaction)
router.post(
  '/checkout/:transactionId',
  auth.authentication,
  Transaction.checkout
)
router.delete('/:transactionId', auth.authentication, Transaction.delete)
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
