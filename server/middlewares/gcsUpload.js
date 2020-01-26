const Unggah = require('unggah')

const storage = Unggah.gcs({
  keyFilename: process.env.GCS_KEYFILE,
  bucketName: process.env.GCS_BUCKET
})

const upload = new Unggah({
  storage: storage // storage configuration for google cloud storage or S3
})


module.exports = upload