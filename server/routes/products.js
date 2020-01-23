const express = require('express');
const router = express.Router();
const Authentication = require('../middlewares/Authentication')
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getAll)
router.post('/', Authentication, ProductController.create)
router.get('/:id', ProductController.get)
router.put('/:id', Authentication, ProductController.update)
router.delete('/:id', Authentication, ProductController.delete)

module.exports = router;
