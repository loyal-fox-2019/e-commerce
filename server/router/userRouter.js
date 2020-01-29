const router = require('express').Router()
const UserController = require('../controller/UserController')
const devTools = require('../middleware/devTools')
const gcsUpload = require('../helper/gcsUpload')
const authentication = require('../middleware/authentication')
const authorizationModel = require('../middleware/authorizationModel')

router.get('/test', UserController.test)
// development tools
router.use('/dev/findAll', devTools('User', 'find') )
router.use('/dev/deleteAll', devTools('User', 'remove') )



router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/:userId', UserController.getOtherUserDetail)


router.use(authentication)
router.get('/', UserController.getUserDetail)
router.use('/:userId', authorizationModel('User'))
router.patch('/:userId', gcsUpload.single('file'), UserController.patchUpdate)

module.exports = router