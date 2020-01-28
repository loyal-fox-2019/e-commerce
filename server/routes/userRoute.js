const routes = require('express').Router()
const controlUser = require('../controllers/controlUser')

routes.post('/register', controlUser.register)

routes.post('/login', controlUser.login)

routes.get("/:id", controlUser.getUser)

routes.post("/google", controlUser.google)

module.exports = routes