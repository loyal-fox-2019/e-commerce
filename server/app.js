require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandling = require('./helpers/errorHandling');
const {
  cartRouter,
  productRouter,
  transactionRouter,
  userRouter
} = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? `mongodb://localhost:27017/e-commerce-${process.env.NODE_ENV}`
    : process.env.DB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`MONGODB connected successfully!`))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/carts', cartRouter);
app.use('/products', productRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter);

app.use(errorHandling);

app.listen(PORT, () => console.log(`listening at port ${PORT}`));

module.exports = app;
