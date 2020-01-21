const router = require('express').Router()
const CartController = require('../controllers/cartController')


/**
 * bikin rute cart untuk increment/decrement qty prod.
 * bikin rute cart untuk add product ke array products.
 * inget send token untuk authenticate authorization untuk cek dia yg punya cart bukan ... 
 * jangan lupa req cart user waktu login nanti idnya dipake untuk cari cart
 * cart yang di client pas logout jangan lupa di clear supaya gabisa dliat org lain
 */

 module.exports = router