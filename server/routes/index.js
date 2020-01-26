const express = require('express')
const router = express.Router()

// router.get('/', )
router.use('/users', require('./users'))
router.use('/products', require('./product'))
router.use('/transactions', require('./transaction'))

module.exports = router
