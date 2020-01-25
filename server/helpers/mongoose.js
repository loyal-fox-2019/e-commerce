const mongoose = require('mongoose')

let MongoURI;

if (process.env.NODE_ENV === 'development') MongoURI = process.env.MONGO_DEV
else if (process.env.NODE_ENV === 'test') MongoURI = process.env.MONGO_TEST
else MongoURI = process.env.MONGO_ATLAS
// console.log(MongoURI, '<= connect kesini loh mas');
// console.log('===================');
mongoose.connect(MongoURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('connected to database as ' + process.env.NODE_ENV)
    }).catch(() => {
        console.log('cant connected to database as ' + process.env.NODE_ENV);
    });

module.exports = mongoose