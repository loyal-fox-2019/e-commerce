const usersRouter = require("express").Router();
const UserController = require("../controllers/userController.js");

const authentication = require("../middlewares/authentication");

const generateTokenGoogle = require("../middlewares/generateTokenGoogle");
const verifyGoogleToken = require("../middlewares/verifyGoogleToken"); 

usersRouter.post('/register', UserController.registerUser);

usersRouter.post('/login', UserController.loginUser);

usersRouter.post('/gsignin',verifyGoogleToken,generateTokenGoogle);

usersRouter.use('/',authentication);

usersRouter.get('/myproducts',UserController.getMyProducts);

usersRouter.get('/cart',UserController.getMyCart);

usersRouter.post('/cart',UserController.addToCart);

usersRouter.delete('/cart',UserController.deleteFromCart);

module.exports = usersRouter;