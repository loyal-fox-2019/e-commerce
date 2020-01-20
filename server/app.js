const env = process.env.NODE_ENV

if (env === 'development' || env === 'test') require('dotenv').config()

const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()

require('./config/mongodb')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', require('./routes/index.js'))
app.use(require('./middlewares/error-handler'))

module.exports = app
