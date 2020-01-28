if (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "dev" || !process.env.NODE_ENV) {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mongoUrl = {
    test: "mongodb://localhost:27017/ecommerce-test",
    // dev: "mongodb://localhost:27017/ecommerce-dev"
    dev: process.env.MONGO_URL_DEV
}

mongoose.connect(mongoUrl[process.env.NODE_ENV], { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log(`connected to database ${mongoUrl[process.env.NODE_ENV]}`)
    })
app.use('/', routes)

app.listen(port, () => {
    console.log(`connected to port ${port}`)
})

module.exports = app