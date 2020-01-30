'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const routesIndex = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

mongoose.connect('mongodb://localhost:27017/testing_ecommerce', 
{useNewUrlParser: true, useUnifiedTopology: true}, function() {
    console.log('Connected to MongoDB');
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routesIndex);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})

module.exports = app;
