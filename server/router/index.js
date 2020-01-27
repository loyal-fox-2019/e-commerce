const router = require("express").Router();
const User = require("./user");
const Products = require("./product");
const Cart = require("./cart");

router.use("/users", User);
router.use("/products", Products);
router.use("/cart", Cart);

module.exports = router;
