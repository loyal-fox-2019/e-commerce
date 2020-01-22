const router = require('express').Router(),
  TransactionController = require('../controllers/transaction'),
  { authorize } = require('../middlewares/auth')

router.get('/', TransactionController.all)
router.get('/pending', TransactionController.getPending)
router.get('/paid', TransactionController.getPaid)
router.get('/delivered', TransactionController.getDelivered)
router.post('/', TransactionController.create)
router.patch('/purchase', TransactionController.purchaseVerify)
router.delete('/purchase', TransactionController.cancelPurchase) // authorize ???
router.patch('/delivered', TransactionController.allDelivered) // authorize transaction
router.patch('/:id/delivered', TransactionController.delivered) // authorize transaction
// router.delete('/:id', authorize, TransactionController.remove)

module.exports = router