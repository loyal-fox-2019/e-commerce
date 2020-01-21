const router = require('express').Router();
const userRouter = require('./user');
const itemRouter =require('./item');

router.use('/api/users', userRouter);
router.use('/api/items', itemRouter);

module.exports = router;