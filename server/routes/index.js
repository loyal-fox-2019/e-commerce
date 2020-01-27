const router = require('express').Router(),
  userRoutes = require('./user'),
  productRoutes = require('./product'),
  transactionRoutes = require('./transaction')
  UserController = require('../controllers/user'),
  { authenticate } = require('../middlewares/auth'),
  upload = require('../middlewares/gcsUpload')

router.post('/register', upload.single('profile_pic'), UserController.register)
router.post('/login', UserController.login)
router.post('/google', UserController.googleLogin)
router.use('/products', productRoutes)
router.use('/users', userRoutes)
router.use(authenticate)
router.use('/transactions', transactionRoutes)

module.exports = router
