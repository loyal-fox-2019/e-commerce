const express = require('express')
const router = express.Router()
const { transactionController } = require('../controllers')
const { authentication, transactionAuth, adminAuth } = require('../middlewares');

router.use(authentication)
router.post('/', transactionController.addTransaction)
router.get('/', transactionController.findMyTranscations)
router.patch('/:transactionId', transactionAuth, transactionController.changeStatus)
router.get('/admin', adminAuth, transactionController.findAllTransactions)


module.exports = router