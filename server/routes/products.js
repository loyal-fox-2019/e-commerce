const express = require('express');
const router = express.Router();
const Authentication = require('../middlewares/Authentication')
const ProductController = require('../controllers/ProductController')
const upload = require('../middlewares/UploadImage')

const authorization = function (req, res, next) {
  if (req.role === 'Admin' || req.role === 'Seller') {
    next()
  }else{
    res.status(404).json({
      message: 'access forbidden'
    })
  }
}

router.get('/', ProductController.getAll)
router.post('/', [ Authentication, authorization], ProductController.create)
router.post('/upload-image', [Authentication, authorization , upload.single('image')], ProductController.uploadImage)
router.get('/:id', ProductController.get)
router.put('/:id', [Authentication, authorization], ProductController.update)
router.delete('/:id', [Authentication, authorization], ProductController.delete)

module.exports = router;
