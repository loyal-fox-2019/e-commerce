var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')
const { authentication } = require('../middlewares/auth')
const { upload } = require('../middlewares/gcsUpload')

router.get('/:id',productController.getOne)
router.get('/',productController.get);
router.use(authentication)
router.post('/', upload.single('image') ,productController.create);
router.delete('/:id',productController.delete)
router.put('/:id',productController.update)

module.exports = router;
