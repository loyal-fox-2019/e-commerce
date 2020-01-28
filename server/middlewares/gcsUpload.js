const Unggah = require('unggah')

const storage = Unggah.gcs({
  keyFilename: './gcs-keyfile.json',
  bucketName: 'mini-wp-images-h8',
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`  // this is the default
  }
})

const upload = new Unggah({
  storage: storage // storage configuration for google cloud storage or S3
})


module.exports = upload