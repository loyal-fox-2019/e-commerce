'use strict'

require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes/index')
const port = process.env.port || 3000
const errorHandler = require('./helpers/errorHandler')

mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log('database connection failed..')
    else {
        console.log('Connected to MongoDB')
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', index)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening to port:${port}`)
})

module.exports = app