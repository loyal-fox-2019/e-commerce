const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'ecommerce-a0a68546cbdc.json',
      bucketName: 'ecommerce-upload'
    }
  })

  module.exports = upload