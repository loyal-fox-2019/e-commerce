require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

mongoose.connect(`mongodb://localhost:27017/e-commerce-1-${process.env.NODE_ENV}-01`, {
   useUnifiedTopology: true,
   useCreateIndex: true,
   useNewUrlParser: true,
   useFindAndModify: false
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', routes)
app.use(errorHandler)

module.exports = app