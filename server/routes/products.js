'use strict'

const express = require('express')
const router = express.Router()
const { Product } = require('../controllers')
const Unggah = require('unggah')
const Authorization = require('../middlewares/authorization')


const storage = Unggah.gcs({
  keyFilename: 'keyfile.json',
  bucketName: process.env.GOOGLE_CLOUD_BUCKET,
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`  // this is the default
  }
})

const upload = new Unggah({
  storage: storage
})

router.post('/', Authorization, upload.single('image'), Product.addProduct)
router.get('/', Product.findAll)
router.get('/bars', Product.findEmasBatang)
router.get('/series', Product.findSeriesBatik)
router.get('/:id', Product.readOne)
router.put('/:id', Authorization, Product.update)
router.delete('/:id', Authorization, Product.delete)

module.exports = router