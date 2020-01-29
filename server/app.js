const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/userModel');
const index = require('./routes/index');

require('dotenv').config();


var mongoDB = 'mongodb+srv://JPetra:15081997@mini-wp-158z1.mongodb.net/e-commerce?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology : true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use('/',index)

module.exports = app
