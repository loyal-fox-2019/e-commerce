const User = require('../models/user')

module.exports = function(done) {
    if(process.env.NODE_ENV == 'test'){
        User.deleteMany()
            .then(() => {
                console.log('User collection deleted')
                done()
            })
            .catch(err => {
                console.log(err)
                done()
            })
    }
}