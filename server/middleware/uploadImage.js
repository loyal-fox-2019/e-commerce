const gcsUpload = require('gcs-upload');

const upload = gcsUpload({
        limits: {
          fileSize: 9e6 // in bytes
        },
        gcsConfig: {
          keyFilename: 'My-Project-9ea281446630.json',
          bucketName: 'mini-wp-upload-image'
        }
    })

module.exports = upload