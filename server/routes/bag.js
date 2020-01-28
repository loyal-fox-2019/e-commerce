const bagRouter = require('express').Router()

const ControllerBag = require('../controllers/bag.js')

const authentication = require('../middlewares/authenticate.js')

bagRouter.use(authentication)

bagRouter.post('/add', ControllerBag.create)

bagRouter.get('/', ControllerBag.findAll)

bagRouter.put('/patch-jumlah/:id', ControllerBag.patchJumlah)

bagRouter.put('/checkout', ControllerBag.checkout)

bagRouter.delete('/delete/:id', ControllerBag.delete)

module.exports = bagRouter
