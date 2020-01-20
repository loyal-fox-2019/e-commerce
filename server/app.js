require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect(`mongodb://localhost:27017/e-commerce-1-dev00`, {
   useUnifiedTopology: true,
   useCreateIndex: true,
   useNewUrlParser: true
})

module.exports = app