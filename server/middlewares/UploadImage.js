const Unggah = require('unggah')
const storage = Unggah.gcs({
  keyFilename: 'hactiv8-d726dbe4c628.json',
  bucketName: 'assets-ecommerce',
  rename: (req, file) => {
    return `${Date.now()}-${file.originalname}`  // this is the default
  }
})

const upload = new Unggah({
  limits: {
    fileSize: 1e6 // in bytes
  },
  storage: storage // storage configuration for google cloud storage or S3
})

module.exports = upload