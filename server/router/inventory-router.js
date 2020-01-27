const express = require('express')
const router = express.Router()
const inventory_controller = require('../controllers/inventory-controller')
const verification = require('../middleware/verification')
const upload = require('../middleware/upload')
const errorhandle = require('../middleware/errorhandle')

router.get('/:id', inventory_controller.find)
router.get('/one/:id', inventory_controller.findone)
router.post('/', verification.authenAdmin,upload.single('image'),inventory_controller.create)
router.delete('/:id',verification.authenAdmin,inventory_controller.delete)
router.put('/:id',verification.authenAdmin,upload.single('image'),inventory_controller.update)
router.use(errorhandle.errors)



module.exports = router