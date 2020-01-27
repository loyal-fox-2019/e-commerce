if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const cors = require('cors')

const mongoUrl = {
  test: 'mongodb://localhost:27017/e-commerce-test',
  development:
    'mongodb+srv://muhafa:muhafa@cluster0-9y81a.gcp.mongodb.net/test?retryWrites=true&w=majority'
}

mongoose
  .connect(mongoUrl[process.env.NODE_ENV], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((result) => {
    console.log('connected')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const mainRouter = require('./routes')

app.use('/', mainRouter)

const errorHandler = require('./middlewares/errorHandler')

app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
