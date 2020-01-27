var express = require('express');
var cors = require('cors')
var mongoose = require('mongoose')
const { errorHandler } = require('./middlewares/errorHandler')
require('dotenv').config()

let mongoUri = {
  start:'mongodb://localhost/e-commerce',
  test:'mongodb://localhost/e-commerce-test',
  dev:'mongodb://localhost/e-commerce-dev'
}

mongoose.connect(process.env.MONGO,{
  useCreateIndex:true,
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useFindAndModify: false
})
  .then( () => {
    console.log(`connected to db ${mongoUri[process.env.NODE_ENV]}`)
  })
  .catch( err => console.log(err))

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log('tester');

app.use('/', indexRouter);
app.use(errorHandler)

module.exports = app;
