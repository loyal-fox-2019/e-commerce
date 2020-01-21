if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-commerce_'+process.env.NODE_ENV, {useNewUrlParser: true, useUnifiedTopology: true});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  // render the error page
  res.status(err.status || 500).json(err);
});

module.exports = app;
