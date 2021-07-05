const express = require('express')
const router = express.Router()
const ItemCtr = require('../controllers/item')

router.post('/', ItemCtr.create)
router.get('/', ItemCtr.getItems)
router.put('/:id', ItemCtr.edit)
router.delete('/:id', ItemCtr.delete)

module.exports = router