const Controller = require("../controllers/cart");
const router = require("express").Router();
const auth = require("../middlewares/authentication");

router.use(auth);
router.get("/", Controller.cartbyUser);
router.post("/", Controller.addCart);
router.delete("/", Controller.deleteByUser);
router.delete("/:id", Controller.deleteCart);
router.patch("/", Controller.checkout);
module.exports = router;
