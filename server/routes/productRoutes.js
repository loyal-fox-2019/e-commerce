const express = require("express");
const product = express.Router();
const { productController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");
const  gcsMiddlewares = require("../middlewares/google-cloud-storage")
const multer = require("multer");

const upload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
});

product.get("/", productController.showProducts)

product.use(authentication)
product.get("/:productId", productController.showProduct)
product.post("/", productController.addProduct)
console.log('++++')
product.patch("/:productId", productController.editProduct);
product.delete("/:productId", productController.deleteProduct);

module.exports = product;