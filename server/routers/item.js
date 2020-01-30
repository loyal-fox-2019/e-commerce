const router = require('express').Router();
const controllerItem = require('../controller/Item');
const checkToken = require('../middleware/checkToken');
const {authorizationItem} = require('../middleware/authorization');

router.get('/', controllerItem.list);
router.get('/:itemName', controllerItem.findItem);

router.use(checkToken);
router.post('/register', controllerItem.register);
router.put('/:id',authorizationItem, controllerItem.update);
router.delete('/:id',authorizationItem, controllerItem.delete);

module.exports = router;