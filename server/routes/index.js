const mainRouter = require('express').Router()

const userRouter = require('./user')

mainRouter.use('/users', userRouter)

const inventoriRouter = require('./inventori')

mainRouter.use('/inventori', inventoriRouter)

const bagRouter = require('./bag')

mainRouter.use('/bag', bagRouter)

const recapRouter = require('./recap')

mainRouter.use('/recaps', recapRouter)

module.exports = mainRouter
