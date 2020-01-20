const router = require('express').Router()
const ItemController = require('../controllers/item-controller')

router.get('/', ItemController.getAllItems)
router.post('/', ItemController.addItem)
router.patch('/:itemId', ItemController.updateItem)
router.delete('/:itemId', ItemController.deleteItem)

module.exports = router
