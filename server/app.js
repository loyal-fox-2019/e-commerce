// if(process.env.NODE_ENV === 'development') 
require ('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const router = require('./router/index')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

/* mongodb://localhost:27017/ecommerce-test */
/*  process.env.DATABASE*/
mongoose.connect(process.env.DATABASE,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}, function(){
    console.log('connect to database')
})
app.use(router)

app.listen(port, function(){
    console.log('server running')
})



module.exports = app



