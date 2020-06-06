'use strict';

const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const { authentication } = require('../middlewares/auth');
const upload = require('../middlewares/gcsUpload');

router.use(authentication);

router.post('/', upload.single('file'), ProductController.create);
router.get('/', ProductController.find);

router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;