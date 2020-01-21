if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')
const port = 3000


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(errorHandler)

mongoose.connect('mongodb://localhost:27017/e-comm-' + process.env.NODE_ENV, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(connect => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log(err)
    })
app.listen(port, () => console.log('App Running on port : ' + port))

module.exports = app