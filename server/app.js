if (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development" || !process.env.NODE_ENV) {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mongoUrl = {
    test: "mongodb://localhost:27017/ecommerce-test"
}

mongoose.connect(mongoUrl[process.env.NODE_ENV], { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
app.use('/', routes)

module.exports = app