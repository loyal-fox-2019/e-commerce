"use strict"

const router = require('express').Router()
const itemController = require('../controllers/Item')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', itemController.findAll)
router.get('/:id', itemController.findOne)

module.exports = router