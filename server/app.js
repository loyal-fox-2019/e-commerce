if (process.env.NODE_ENV == 'development'|| process.env.NODE_ENV == 'test' ) {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const Routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(
        process.env.MONGO_URI, 
        {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    )
    .then(() => {
        console.log('===Database Connected===')
    })
    .catch(err => {
        console.log('Error', err)
    })

app.use('/', Routes)

app.listen(PORT, function() {
    console.log(`Listening on PORT: ${PORT}`)
})

module.exports = app