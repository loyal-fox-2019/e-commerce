'use strict'
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const db = mongoose.connection
const route = require("./routers/index")
const errorHandler = require("./middlewares/errorhandler")

require ('dotenv').config()

app.use(cors())

mongoose.connect('mongodb+srv://grindpants:asd123@cluster0-gr5wb.gcp.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function (){
    console.log('db connected')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', route)
app.use(errorHandler)

module.exports = app

