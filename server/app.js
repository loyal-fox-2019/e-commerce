require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const {errorHandler} = require('./middlewares/errorHandler')
const morgan = require('morgan')
require('./helpers/mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use('/', router)

app.use(errorHandler)
// console.log('zoee');
module.exports = app