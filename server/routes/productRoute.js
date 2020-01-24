const router = require('express').Router();
const productCon = require('../controllers/productController');

router.get('/', productCon.findAll)
router.get('/:_id', productCon.findOne)
router.post('/', productCon.create)
router.put('/:_id', productCon.edit)
router.delete('/:_id', productCon.delete)

module.exports = router