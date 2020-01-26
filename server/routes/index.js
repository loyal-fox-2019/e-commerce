const express = require("express");
const router = express.Router();
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes")
const transactionRoutes = require('./transactionRoutes')
const { adminAuth } = require('../middlewares')

router.use("/products", productRoutes)
router.use("/user", userRoutes)

// router.use(adminAuth)
router.use('/transactions', transactionRoutes)

// router.use("/cart", cartRoutes)

module.exports = router;