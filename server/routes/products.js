const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const auth = require('../middlewares/auth');

// show products
router.get("/", productController.showAll);

// add product
router.post("/", auth.authentication, auth.adminOnly, productController.add);

// edit product
router.patch("/", productController.edit);

// delete product
router.delete("/", productController.delete);

module.exports = router;
