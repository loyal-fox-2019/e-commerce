'use strict'

const router = require('express').Router(),
      ProductController = require('../controllers/productController'),
      { authentication, authorization } = require('../middlewares/auth'),
      { multer, sendUploadToGCS } = require("../middlewares/gcs");

router.get('/', ProductController.findAll)
router.get('/search/:keyword', ProductController.search)

router.use(authentication)
router.post('/',
  multer.single("image"),
  sendUploadToGCS,
ProductController.create)
router.get('/:id', ProductController.findOne)
router.get('/all/own', ProductController.findMine)

router.use('/:id', authorization)
router.delete('/:id', ProductController.destroy)
router.put('/:id', 
  multer.single("image"),
  sendUploadToGCS,
ProductController.update)

module.exports = router;