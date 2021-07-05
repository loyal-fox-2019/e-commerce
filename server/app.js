require('dotenv').config()

const express = require('express')
const app = express()
const PORT =  3000 || process.env.PORT
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const { errorHandler } = require('./middlewares/errorHandler')

mongoose.connect('mongodb://localhost:27017/ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Connected to mongoose!')
    })
    .catch((err) => {
        console.log(err)
    })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`App listening to port ${PORT}!`))

module.exports = app