const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Product = require('../models/products')
const authentication = require('../middlewares/authentication')
const User = require('../models/user')
const upload = require('../middlewares/gcs-upload')


/**
 * bikin rute cart untuk increment/decrement qty prod.
 * bikin rute cart untuk add product ke array products.
 * inget send token untuk authenticate authorization untuk cek dia yg punya cart bukan ... 
 * jangan lupa req cart user waktu login nanti idnya dipake untuk cari cart
 * cart yang di client pas logout jangan lupa di clear supaya gabisa dliat org lain
 */