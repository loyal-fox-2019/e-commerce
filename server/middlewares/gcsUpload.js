const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  limits: {
    fileSize: 1e6
  },
  gcsConfig: {
    keyFilename: process.env.KEYFILE_NAME,
    bucketName: process.env.BUCKET_NAME
  }
})

module.exports = upload