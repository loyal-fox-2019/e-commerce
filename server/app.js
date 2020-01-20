'use strict';
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { errHandler } = require('./middlewares');
const routes = require('./routes');

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database ${MONGO_URI}`))
  .catch((err) => {
    console.log('Connection to database fail!')
    console.log('error:');
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errHandler);
module.exports = app;
