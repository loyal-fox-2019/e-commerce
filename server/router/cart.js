const router = require('express').Router()
const controllerC = require('../controllers/cart')
const { authenticating, itemStock } = require('../middlewares/auth')

router.post('/', authenticating, controllerC.createCart)

router.get('/all', controllerC.readAllCart)

router.get('/pending', authenticating, controllerC.readCartForPendingStatus)

router.patch('/pending/:id', authenticating, controllerC.updatePendingToPaid)

router.get('/paid', authenticating, controllerC.readCartForPaidStatus)

router.patch('/paid/:id', authenticating, controllerC.updateStatusPaidToDelivered)

router.get('/deliver', authenticating, controllerC.readCartForDeliveredStatus)

router.delete('/:id', authenticating, controllerC.deleteCartFromPendingStatus)

router.patch('/num/:id', authenticating, controllerC.updateJumlahItemCartDiPendingStatus)



module.exports = router