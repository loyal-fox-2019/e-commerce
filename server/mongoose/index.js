'use strict';

const mongoose = require('mongoose');
const uri = `mongodb://localhost:27017/e-comm`;
// const uri = `mongodb+srv://kirwanm:${process.env.MONGODB_KEY}@projects-og8m8.gcp.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Mongodb connected ...');
})
.catch(err => {
    console.log('Mongodb fail to connect: ', err);
});

module.exports = mongoose;