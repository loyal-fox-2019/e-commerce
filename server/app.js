const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/index')
const port = 3000
const cors = require('cors')
require('dotenv').config()

app.use(cors())

mongoose.connect(process.env.MONGO_ATLAS, {useNewUrlParser:true, useUnifiedTopology: true})
.then(success => {
    console.log('connected to h8ecommerce on Atlas')
})
.catch(err => {
    console.log(err)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})

module.exports = app