const gcsUpload = require("gcs-upload");

const upload = gcsUpload({
  limits: {
    fileSize: 2e6 // in bytes
  },
  gcsConfig: {
    keyFilename:
      "/home/bayuoktari/Documents/Phase 2/Week3/e-commerce/server/json-gcs-service.json",
    bucketName: "miniwp-upload"
  }
});

module.exports = upload;
