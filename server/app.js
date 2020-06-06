if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/e-commerce2_'+process.env.NODE_ENV, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send('hello world')
})

const router = require('./routes')
app.use('/', router)

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  let status = 500
  message = 'internal server error'
  switch (err.name) {
      case 'ValidationError':
          status = 400
          message = err.message
          break;
      case 'MongoError':
          status = 409
          message = ''
          for (const key in err.keyValue) {
              message += `${key}: ${err.keyValue[key]} has been used. `
          }
          break;
      default:
          break;
  }

  res.status(status).json({
      message
  })
});

module.exports = app;
