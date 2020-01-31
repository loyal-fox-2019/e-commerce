const router = require('express').Router()
const ItemController = require('../controller/ItemController')
const devTools = require('../middleware/devTools')
const gcsUpload = require('../helper/gcsUpload')
const authentication = require('../middleware/authentication')
const authorizationModel = require('../middleware/authorizationModel')

router.get('/test', ItemController.test)
// development Tools
router.use('/dev/findAll', devTools('Item','find'))
router.use('/dev/deleteAll', devTools('Item', 'remove'))

router.get('/aggregate', ItemController.aggregateGroup) //test case aggregate grouping


// no authentication && no authorization
router.get('/all/:sellerId', ItemController.findAllItemBySellerId )
router.get('/all/?', ItemController.findAllItem) //paginated  //bisa find all atau bulk find
router.get('/countAllItem', ItemController.countAllItem)
router.post('/filter', ItemController.findFilterItem)
router.get('/:itemId', ItemController.findOneItem)    




router.use(authentication)
router.post('/', gcsUpload.single('file'), ItemController.createItem)
// router.patch('/buyItem/:itemId', stockChecking, ItemController.patchBuyItem)
router.post('/devSeed', ItemController.seedingItem)

router.use('/:itemId', authorizationModel('Item'))
router.patch('/:itemId', gcsUpload.single('file'), ItemController.patchEditItem)
router.delete('/:itemId', ItemController.deleteOneItem)


module.exports = router