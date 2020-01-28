const { User } = require('../models');

module.exports = done => {
  if (process.env.NODE_ENV === 'test') {
    User.deleteMany({})
      .then(function() {
        // console.log('User collection cleared!');
        done();
      })
      .catch(function(err) {
        // console.log(err);
        done(err);
      });
  }
};
