const productsRouter = require("express").Router();
const ProductController = require("../controllers/productController.js");

const authentication = require("../middlewares/authentication");

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

productsRouter.post('/',ProductController.addNewProduct);

productsRouter.delete('/:id',(req,res,next) => {
    Product.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => {
        res.sendStatus(204);
    })
    .catch((err) => {
        console.log(err);        
    })
})

module.exports = productsRouter;