const gcsUpload = require('gcs-upload')
  
const upload = gcsUpload({
  // limits: {
  //   fileSize: 1e6 // in bytes
  // },
  gcsConfig: {
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    bucketName: 'bucket.amilhasbala.com'
  }
})

module.exports = upload