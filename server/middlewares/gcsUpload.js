'use strict';

const gcsUpload = require('gcs-upload');
const upload = gcsUpload ({
    limits: {
        fileSize: 2e6
    },
    gcsConfig: {
        keyFilename: `${process.argv[1].split('/app.js').join('')}/google-credentials-keyfile-d904fb7cf81f.json`,
        bucketName: 'ecomm-km'
    }
});

module.exports = upload;