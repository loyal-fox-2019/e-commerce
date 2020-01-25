if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const routes = require('./routes');
const mongoose = require('mongoose');

// const dbUrl = `mongodb://localhost:27017/tookoo_${process.env.NODE_ENV}`
const dbUrl = `mongodb+srv://dbHarfi:${process.env.MONGO_PASSWORD}@hacktiv-ra2tp.mongodb.net/tookoo_${process.env.NODE_ENV}?retryWrites=true&w=majority`

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(
  express.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded
app.use("/", routes);

app.listen(port, () => console.log(`TOOKOO-API is running on port: ${port}!`));