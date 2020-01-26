const usersRouter = require("express").Router();
const UserController = require("../controllers/userController.js");

const authentication = require("../middlewares/authentication");

usersRouter.post('/register', UserController.registerUser);

usersRouter.post('/login', UserController.loginUser);

usersRouter.use('/',authentication);

usersRouter.get('/myproducts',UserController.getMyProducts);

usersRouter.get('/cart');

usersRouter.post('/cart');

module.exports = usersRouter;