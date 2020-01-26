const router = require('express').Router();
const productCon = require('../controllers/productController');
const gcsUpload = require('gcs-upload');

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: '/home/jpetra/Documents/Phase\ 3/jovipetra-bd211966abec.json',
    bucketName: 'miniwp-images-jovi'
  }
})

router.get('/', productCon.findAll)
router.get('/:_id', productCon.findOne)
router.post('/',upload.single('file'), productCon.create)
router.put('/:_id', productCon.edit)
router.delete('/:_id', productCon.delete)

module.exports = router