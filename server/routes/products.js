const productsRouter = require("express").Router();
const ProductController = require("../controllers/productController.js");

const authentication = require("../middlewares/authentication");
const product_authorisation = require("../middlewares/authorisation").product_authorisation;

const gcsUpload = require("gcs-upload");
const upload = gcsUpload({
    limits: {
        fileSize: 50e6 // in bytes
    },
    gcsConfig: {
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        bucketName: process.env.BUCKETNAME
    }
})

productsRouter.get('/',ProductController.getAllProducts);

productsRouter.get('/:id',ProductController.getOneProduct);

productsRouter.use('/',authentication);

productsRouter.post('/', upload.single('file'), ProductController.addNewProduct);

productsRouter.put('/:id', product_authorisation, upload.single('file'), ProductController.editProduct);

productsRouter.patch('/:id', product_authorisation, ProductController.restockProduct);

productsRouter.delete('/:id',product_authorisation, ProductController.deleteProduct);

module.exports = productsRouter;