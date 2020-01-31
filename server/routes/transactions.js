'use strict'

const router = require('express').Router(),
      TransactionController = require('../controllers/transactionController'),
      { transactionAuthorization, adminAuthorization } = require('../middlewares/auth')


router.get('/', adminAuthorization, TransactionController.findAll)
router.patch('/:id/sent', adminAuthorization, TransactionController.adminUpdate)

router.post('/', TransactionController.create)
router.get('/all/own', TransactionController.findByBuyer)

router.use('/:id', transactionAuthorization)
router.get('/:id', TransactionController.findOne)
router.patch('/:id/delivered', TransactionController.userUpdate)

module.exports = router;

