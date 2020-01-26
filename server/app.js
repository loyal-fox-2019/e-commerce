require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const uri = `${process.env.MONGO_URI}_${process.env.NODE_ENV}`
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

mongoose.connect(uri, options).then(
  () => { 
    if (process.env.NODE_ENV != 'test'){
      console.log(`Connected to ${process.env.NODE_ENV} database`) 
    }
  },
  err => { console.log(err) }
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(routes)

app.use(errorHandler)

module.exports = app