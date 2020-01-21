"use strict"

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/testing'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const deprecationWarning = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(`${MONGO_URI}-${process.env.NODE_ENV}`, deprecationWarning)
    .then(() => {
        console.log('connected to database' + MONGO_URI)
    }).catch((err) => {
        console.log('not connected. err: ' + err.message)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use('/', routes)
app.use(errorHandler)


module.exports = app