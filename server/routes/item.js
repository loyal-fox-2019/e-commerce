const router = require('express').Router()
const ItemController = require('../controllers/itemController')
const Authenticate = require('../middlewares/authenticate')
const Authorize = require('../middlewares/authorization')

router.get('/', Authenticate, ItemController.getItem)
router.post('/', Authenticate, ItemController.addItem)
router.delete('/:id', Authenticate, Authorize, ItemController.removeItem)
router.put('/:id', Authenticate, Authorize, ItemController.editItem)

module.exports = router