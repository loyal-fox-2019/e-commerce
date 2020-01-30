const gcsUpload = require('gcs-upload')

module.exports = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: 'mini-wp-38c3ef053632.json',
      bucketName: 'storage-miniwp-mashumuro'
    }
})