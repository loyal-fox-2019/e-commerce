const router = require('express').Router(),
  TransactionController = require('../controllers/transaction'),
  { authorizeTransaction } = require('../middlewares/auth')

router.get('/', TransactionController.all)
router.get('/pending', TransactionController.getPending)
router.get('/paid', TransactionController.getPaid)
router.get('/delivered', TransactionController.getDelivered)
router.post('/', TransactionController.create)
router.patch('/purchase', TransactionController.purchaseVerify)
router.patch('/delivered', TransactionController.allDelivered)
router.patch('/:id/delivered', authorizeTransaction, TransactionController.delivered)
router.patch('/:id/quantity', authorizeTransaction, TransactionController.update)
router.delete('/:id', authorizeTransaction, TransactionController.remove)

module.exports = router