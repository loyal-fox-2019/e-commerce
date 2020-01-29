switch (process.env.NODE_ENV) {
    
    case 'testing':
        require('dotenv').config()
        require('./config/mongo-test')
        break;

    case 'development':
        require('dotenv').config()
        require('./config/mongo-dev')
        break;

    case 'preDeploy':
        require('dotenv').config()
        require('./config/mongo-prod`')
        break

    case 'production':
        require('./config/mongo-prod')
}

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('cors')())
app.use(require('morgan')('combined'))


app.use('/', require('./router'))
app.use(require('./middleware/errorHandler'))

module.exports = app