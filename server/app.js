if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
})

const mongoUrl = {
    test: 'mongodb://localhost:27017/e-commerce_test',
    development: 'mongodb://localhost:27017/e-commerce_dev'
}

// mongoose.connect(mongoUrl[process.env.NODE_ENV], {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
    console.log('connected to database');
    
})
.catch(err=>{
    console.log(err);
})

app.use('/', routes)

module.exports = app