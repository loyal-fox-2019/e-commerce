const User = require('../models/user')
const mongoose = require('mongoose')
module.exports = function (done) {
    if (process.env.NODE_ENV === 'test') {
        User
            .deleteMany()
            .then(function () {
                console.log('User Collection clear')
                done();
            })
            .catch(function (err) {
                console.log(err);
                done(err)
            });
    }
};