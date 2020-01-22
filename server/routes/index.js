const express = require("express");
const router = express.Router();
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes")

router.use("/products", productRoutes)
router.use("/user", userRoutes)
router.use("/cart", cartRoutes)

module.exports = router;