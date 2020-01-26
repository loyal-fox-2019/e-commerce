const router = require('express').Router()
const ProductCtrl = require('../controllers/ProductCtrl')
const gcsUpload = require('../middlewares/gcsUpload')

router.get('/', ProductCtrl.getAll)
router.get('/:id', ProductCtrl.getOne)
router.post('/', gcsUpload.single('image'), ProductCtrl.create)
router.put('/:id', ProductCtrl.update)
router.delete('/:id', ProductCtrl.delete)

module.exports = router