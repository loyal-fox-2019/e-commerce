const router = require('express').Router()
const controllerC = require('../controllers/cart')
const { authenticating } = require('../middlewares/auth')
const {addChecking} = require('../middlewares/stockCheck')

router.post('/', authenticating, addChecking, controllerC.createCart) // sudah di cek

router.get('/all', controllerC.readAllCart) // sudah di cek

router.get('/pending', authenticating, controllerC.readCartForPendingStatus) // sudah di cek

router.patch('/pending', authenticating, controllerC.updatePendingToPaid) // sudah cek

router.get('/paid', authenticating, controllerC.readCartForPaidStatus) // sudah cek

router.patch('/paid/:id', authenticating, controllerC.updateStatusPaidToDelivered) // sudah cek

router.get('/deliver', authenticating, controllerC.readCartForDeliveredStatus) // sudah cek

router.patch('/num/:id', authenticating, controllerC.updateJumlahItemCartDiPendingStatus)

router.delete('/:id', authenticating, controllerC.deleteCartFromPendingStatus) // sudah di check



module.exports = router