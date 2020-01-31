const gcsUpload = require('gcs-upload')


const upload = gcsUpload({
    limits: {
        fileSize: 1e6
    },
    gcsConfig:{
        keyFilename: '/home/riko/Documents/phase 2/week2/day1/hack-tiv8-project-4bdb4ee78a06.json',
        bucketName: 'article-image-miniwp'
    }
})

module.exports = upload