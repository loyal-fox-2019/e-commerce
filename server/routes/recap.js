const recapRouter = require('express').Router()

const ControllerRecap = require('../controllers/recap.js')

const authentication = require('../middlewares/authenticate.js')

recapRouter.use(authentication)

recapRouter.post('/add', ControllerRecap.insertMany)

recapRouter.get('/', ControllerRecap.findAll)

module.exports = recapRouter

module.exports = recapRouter
