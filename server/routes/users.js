const usersRouter = require("express").Router();
const UserController = require("../controllers/userController.js");

usersRouter.post('/register', UserController.registerUser);

usersRouter.post('/login', UserController.loginUser);

usersRouter.post('/cart', (req, res, next) => {
    
    
});

module.exports = usersRouter;