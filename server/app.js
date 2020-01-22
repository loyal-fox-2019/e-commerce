const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/index')
const port = 3000
const cors = require('cors')

app.use(cors())

mongoose.connect('mongodb://localhost:27017/eCommerce'+process.env.NODE_ENV, {useNewUrlParser:true}, { useUnifiedTopology: true })

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})

module.exports = app