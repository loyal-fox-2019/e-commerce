"use strict"

const router = require('express').Router()
const itemController = require('../controllers/Item')
const authentication = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const upload = require('../middlewares/uploadImage')

router.get('/', itemController.findAll)
router.use(authentication)
router.get('/:id', itemController.findOne)

//admin
router.use(authorizeAdmin)
router.post('/', upload.single("image"), itemController.create)
router.patch('/:id', upload.single("image"), itemController.update)
router.delete('/:id', itemController.delete)


module.exports = router