const gcsUpload = require('gcs-upload')
const uploadImage = gcsUpload({
  limits: {
    fileSize: 0.5e7, // in bytes => 5mb
  },
  gcsConfig: {
    keyFilename: process.env.KEY_FILENAME,
    bucketName: process.env.BUCKET_NAME,
  },
})

module.exports = uploadImage
