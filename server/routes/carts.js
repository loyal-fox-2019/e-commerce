const express = require('express');
const router = express.Router();
const Authentication = require('../middlewares/Authentication')
const CartController = require('../controllers/CartController')

const authorization = function (req, res, next) {
  const Cart = require('../models/Cart')
  Cart
    .findOne({
      _id: req.params.id,
      costumer: req.userId
    })
    .then(cart => {
      if (cart) {
        next()
      }else{
        res.status(404).json({
          message: 'access forbidden'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'internal server error'
      })
    })
}

router.use('/', Authentication)
router.get('/', CartController.getAll)
router.post('/', CartController.create)
router.get('/:id', CartController.get)
router.patch('/amount/:id', authorization ,CartController.updateAmount)
router.delete('/:id', authorization ,CartController.delete)

module.exports = router;
