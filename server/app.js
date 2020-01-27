if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development")
  require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errorHandler);
let db = "";
if ((process.env.NODE_ENV = "test")) {
  db = process.env.DB_TEST;
} else {
  db = process.env.DB_URL;
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(connect => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });
app.listen(port, () => console.log("App Running on port : " + port));

module.exports = app;
