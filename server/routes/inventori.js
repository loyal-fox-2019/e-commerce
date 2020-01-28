const inventoriRouter = require('express').Router()

const ControllerInventori = require('../controllers/inventori')

const upload = require('../helpers/gcs-upload')

const authentication = require('../middlewares/authenticate.js')

inventoriRouter.get(
  '/',
  function(req, res, next) {
    if (!req.headers.token) {
      next()
    } else {
      next('route')
    }
  },
  ControllerInventori.find
)

inventoriRouter.use(authentication)

inventoriRouter.get('/', ControllerInventori.findAll)

inventoriRouter.post(
  '/add',
  upload.single('gambar'),
  ControllerInventori.create
)

inventoriRouter.get('/:userId/:idBarang', ControllerInventori.getInv)

inventoriRouter.get('/own', ControllerInventori.getOwnInv)

inventoriRouter.put('/update-stok/:id', ControllerInventori.updateStok)

const authorize = require('../middlewares/authorize.js')

inventoriRouter.put(
  '/update/:id',
  authorize,
  upload.single('gambar'),
  ControllerInventori.update
)

inventoriRouter.delete('/delete/:id', authorize, ControllerInventori.delete)

module.exports = inventoriRouter
