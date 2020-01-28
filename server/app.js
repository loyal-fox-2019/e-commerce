'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const router = require('./router/index');
const errorHandler = require('./middlewares/errorHandler');

mongoose
	.connect('mongodb://localhost/e-commerse', {
		useNewUrlParser    : true,
		useUnifiedTopology : true
	})
	.then(() => {
		console.log('connected');
	})
	.catch(() => {
		console.log('err');
	});

app.use('/', router);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
