const router = require('express').Router()
const TxController = require('../controller/TransactionController')
const devTools = require('../middleware/devTools')
const authentication = require('../middleware/authentication')
const authorizationModel = require('../middleware/authorizationModel')
const stockChecking = require('../middleware/stockChecking')

// const stockCheckingUpdate = require('../middleware/0gakkepake but logicnya jalan - stockCheckingUpdate')

router.get('/test', TxController.test)
// dev tools
router.use('/dev/findAll', devTools('Transaction', 'find'))
router.use('/dev/deleteAll', devTools('Transaction', 'remove'))



router.use(authentication)
router.post('/', stockChecking, TxController.createTransaction, TxController.patchUpdateAmount)
router.get('/all', TxController.findAllTransactionByBuyerId)
router.get('/aggregate', TxController.incompleteAggregateGroupBySellerId)


router.use('/:txId', authorizationModel('Transaction'))
router.get('/:txId', TxController.findOneTransaction)
router.patch('/:txId/amount', stockChecking, TxController.patchUpdateAmount)
router.patch('/:txId/status', TxController.patchUpdateStatus) // yang update status juga Buyer, dilakukan otomatis ketika Buyer make payment (checkout)
router.delete('/:txId', TxController.deleteOne)


module.exports = router