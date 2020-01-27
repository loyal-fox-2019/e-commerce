const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'H8-Ecommerce-8d883bc81519.json',
      bucketName: 'h8-ecommerce-storage'
    }
  })

  module.exports = upload