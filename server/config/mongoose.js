const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(_=> console.log('Connected to database...'))
  .catch(err => console.log('Failed to connect to database ', err))

module.exports = mongoose