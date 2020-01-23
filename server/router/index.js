const router = require('express').Router()

router.use('/users', require('./userRouter'))
router.use('/items', require('./itemRouter'))
router.use('/transactions', require('./transactionRouter'))
router.use('/invoices', require('./invoiceRouter'))

module.exports = router