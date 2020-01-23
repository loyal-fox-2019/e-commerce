const router = require('express').Router()
const ItemController = require('../controllers/item-controller')
const gcp = require('../middlewares/gcp')
const { authenticate, authorizeAdmin } = require('../middlewares/auth')

router.get('/', ItemController.getAllItems)
router.use(authenticate)
router.use(authorizeAdmin)
router.post('/', gcp.single('image'), ItemController.addItem)
router.patch('/:itemId', ItemController.updateItem)
router.delete('/:itemId', ItemController.deleteItem)

module.exports = router
