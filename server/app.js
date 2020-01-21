require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorHandling = require('./helpers/errorHandling');
const {
  cartRouter,
  itemRouter,
  transactionRouter,
  userRouter
} = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
  `mongodb://localhost:27017/e-commerce-${process.env.NODE_ENV}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/carts', cartRouter);
app.use('/items', itemRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter);

app.use(errorHandling);

// app.listen(PORT, () => console.log(`listening at port ${PORT}`));

module.exports = app;
