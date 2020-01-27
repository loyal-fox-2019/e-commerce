const router = require("express").Router();
const Controller = require("../controllers/product");
const upload = require("../middlewares/upload-gcs");
const verifadmin = require("../middlewares/verifAdmin");
const authentication = require("../middlewares/authentication");

router.get("/", Controller.getAllProduct);
router.get("/:id", Controller.getById);
router.use(authentication);
router.post("/", verifadmin, upload.single("thumbnail"), Controller.addProduct);
router.delete("/:id", verifadmin, Controller.deleteProduct);
router.put("/:id", verifadmin, Controller.updateProduct);
router.patch("/:id/stock", Controller.updateProductStock);

module.exports = router;
