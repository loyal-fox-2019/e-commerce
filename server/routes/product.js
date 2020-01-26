const express = require('express');
const gcsUpload = require('gcs-upload');
const { ProductController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = express.Router();

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './keyfile.json',
    bucketName: 'product-image-123'
  }
});

// create
router.post(
  '/',
  upload.single('image'),
  authentication,
  authorization,
  ProductController.create
);

// read all
router.get('/', ProductController.readAll);

// read one
router.get('/:productId', ProductController.readOne);

// update
router.put(
  '/:productId',
  authentication,
  authorization,
  upload.single('image'),
  ProductController.update
);

// delete
router.delete(
  '/:productId',
  authentication,
  authorization,
  ProductController.delete
);

module.exports = router;
