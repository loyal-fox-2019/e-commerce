const routes = require("express").Router();
const productsRouter = require("./products");

routes.use('/products', productsRouter);

module.exports = routes;