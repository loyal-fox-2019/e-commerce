const router = require('express').Router()
const InvoiceController = require('../controller/InvoiceController')
const devTools = require('../middleware/devTools')
const authentication = require('../middleware/authentication')
const authorizationModel = require('../middleware/authorizationModel')
const bulkStockChecking = require('../middleware/stockCheckingBulk')
const bulkPatchItemStock = require('../controller/ItemController').bulkPatchItemStock
const bulkPatchTransactionStatus = require('../controller/TransactionController').bulkPatchTransactionStatus
const updateStatus = InvoiceController.updateStatus

router.get('/test', InvoiceController.test)
// dev TOols
router.use('/dev/findAll', devTools('Invoice', 'find') )
router.use('/dev/deleteAll', devTools('Invoice', 'remove'))


router.use(authentication)
router.post('/', bulkStockChecking, bulkPatchItemStock, bulkPatchTransactionStatus, InvoiceController.createInvoice)
// router.post('/', InvoiceController.createInvoice)


// router.get('/all', InvoiceController.findAllInvoiceByOptions) //bisa by BuyerId || SellerId ||&& Invoice Status
router.post('/allConditioned', InvoiceController.findAllConditionedInvoices)
router.get('/:invoiceId', authorizationModel('Invoice', 'Either'), InvoiceController.findOneInvoice) // search one by Buyer Id || SellerId

router.use('/:invoiceId/seller', authorizationModel('Invoice', 'Seller'))
router.patch('/:invoiceId/Seller/paymentConfirmation', InvoiceController.patchUpdateInvoice)
router.patch('/:invoiceId/Seller/inputResi', InvoiceController.patchUpdateInvoice)


router.use('/:invoiceId/buyer', authorizationModel('Invoice', 'Buyer'))
// router.patch('/:invoiceId/buyer/payment', InvoiceController.patchUpdateInvoice)
router.patch('/:invoiceId/buyer/deliveryConfirmation', InvoiceController.patchUpdateInvoice)






module.exports = router