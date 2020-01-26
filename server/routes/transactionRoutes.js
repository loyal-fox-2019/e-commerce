const express = require('express')
const router = express.Router()
const { transactionController } = require('../controllers')
const { authentication, transactionAuth } = require('../middlewares');

router.use(authentication)
router.post('/', transactionController.addTransaction)
router.get('/', transactionController.findMyTranscations)
router.patch('/:transactionId', transactionAuth, transactionController.changeStatus)


module.exports = router