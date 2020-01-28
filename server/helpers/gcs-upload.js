const gcsUpload = require('gcs-upload')
const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename:
      '/home/fajri/Documents/Hacktiv8 Exercise/Phase 2/Week 2/Day 1/mini-wp/server/mini-wp-dd0642f03599.json',
    bucketName: 'upload-image-fajri'
  }
})

module.exports = upload
