if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  console.log(`"${process.env.NODE_ENV}"`);
  require('dotenv').config();
}

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    console.log(`MongoDB connected: ${process.env.MONGO_URI}`);
  }).catch((err) => {
    console.error(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);

// error handler
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
  // res.render('error');
});

module.exports = app;
