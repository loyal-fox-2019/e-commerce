const routes = require('express').Router()
const modelProduct = require('../models/modelProduct')
const controlProduct = require('../controllers/controlProduct')
const authentication = require("../middleware/authentication")
const upload = require('../middleware/gcs-upload')
const { toEditAndDeleteProduct } = require('../middleware/authorization')


//nanti kasih authentication dan authorization
// routes.post('/', authentication, toEditAndDeleteProduct, controlProduct.addProduct)
routes.post('/', authentication, upload.single('file'), controlProduct.addProduct)

routes.get('/all', controlProduct.getAllProduct)

routes.get('/myProducts', authentication, controlProduct.myProducts)

routes.get('/:name', controlProduct.findByName)

routes.get('/id/:id', controlProduct.findById)

routes.put('/:id', authentication, toEditAndDeleteProduct, upload.single('file'), controlProduct.updateProduct)

routes.delete('/:id', authentication, toEditAndDeleteProduct, controlProduct.deleteProduct)

routes.post("/addToCart/:id", authentication, controlProduct.addToCart)

routes.get("/cart/myCart", authentication, controlProduct.getMyCarts)

routes.delete("/cart/myCart/delete/:id", authentication, controlProduct.deleteFromCart)

routes.patch("/cart/myCart/checkOut", authentication, controlProduct.checkOut)

routes.get("/history/transaction", authentication, controlProduct.getHistory)
module.exports = routes