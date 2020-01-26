const router = require("express").Router();
const Controller = require("../controllers/user");
const auth = require("../middlewares/authentication");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/admin", Controller.adminLogin);
router.patch("/", auth, Controller.editAddress);

module.exports = router;
