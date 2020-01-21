const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
        fileSize: 1e6
    },
    gcsConfig: {
        keyFilename: process.env.GCS_KEY_FILE,
        bucketName: process.env.GCS_BUCKET
    }
})

module.exports = upload