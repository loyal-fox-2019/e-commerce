module.exports = require('gcs-upload')({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './eCommerce-cd11eeab9fc6.json',
      bucketName: 'ecommerce-storage'
    }
})
   