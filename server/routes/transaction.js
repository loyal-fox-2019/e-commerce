'use strict'

const router = require('express').Router()
const transactionController = require('../controllers/transaction')
const { authenticate } = require('../middlewares/authenticate')

router.use(authenticate)
router.put('/:id', transactionController.updateStatusTransaction)
router.get('/user/:id', transactionController.getUserTransactionOne)
router.get('/', transactionController.getAllTransaction)
router.get('/user', transactionController.getUserTransaction)

module.exports = router