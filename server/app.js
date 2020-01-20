if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const mongoUrl = {
    test: 'mongodb://localhost:27017/e-commerce_test'
}

mongoose.connect(mongoUrl[process.env.NODE_ENV], {useNewUrlParser: true, useUnifiedTopology: true})

app.use('/', routes)

module.exports = app