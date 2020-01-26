const router = require('express').Router()
const ItemController = require('../controllers/itemController')
const Authenticate = require('../middlewares/authenticate')
const Authorize = require('../middlewares/authorization')
const Upload = require('../middlewares/uploadImage')

router.get('/', ItemController.getItem)
router.get('/:id', ItemController.getSingleItem)
router.get('/category/:category', ItemController.getItemCategory)
router.post('/', Authenticate, Authorize, Upload.single('image'), ItemController.addItem)
router.delete('/:id', Authenticate, Authorize, ItemController.removeItem)
router.put('/:id', Authenticate, Authorize, Upload.single('image'), ItemController.editItem)

module.exports = router