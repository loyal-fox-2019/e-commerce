const routes = require("express").Router();
const productsRouter = require("./products");
const usersRouter = require("./users");

routes.use('/products', productsRouter);
routes.use('/users',usersRouter);

module.exports = routes;