'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const dbURL = {
  development: 'mongodb://localhost:27017/ecomm',
  test: 'mongodb://localhost:27017/ecommtest',
  production: 'mongodb+srv://alvina:L4gimakandisushiT31!?@cluster0-zogd9.gcp.mongodb.net/test?retryWrites=true&w=majority'
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

mongoose.connect(dbURL[process.env.NODE_ENV], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log(err))

app.use('/', router)
app.use(errorHandler)

module.exports = app;