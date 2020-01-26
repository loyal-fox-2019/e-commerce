"use strict"

const router = require('express').Router()
const userRouter = require('./user')
const itemRouter = require('./item')

router.use('/users', userRouter)
router.use('/items', itemRouter)

module.exports = router