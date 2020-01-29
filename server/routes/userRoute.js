const router = require('express').Router();
const userCon = require('../controllers/userController');

router.post('/login', userCon.login)
router.post('/register', userCon.register)
router.post('/one', userCon.findOne)
router.post('/addtocart/:email', userCon.addToCart)
router.post('/deletecart/:email', userCon.deleteFromCart)
router.put('/emptycart/:email', userCon.emptyCart)

module.exports = router
