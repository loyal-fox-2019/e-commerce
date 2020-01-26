const gcsUpload = require('gcs-upload')
// console.log('masuk kesini pak')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './keyfile-gcs.json',
    bucketName: 'ecommerce_image'
  }
})

module.exports = upload
