const express = require('express')
const Item = express.Router()
const ItemCon = require('../controllers/ItemCon')
const { adminAuthenticate } = require('../midllewares/loginUserAuth')
const { itemAuthorize } = require('../midllewares/itemAuth')

//find all
Item.get('/',ItemCon.findAll)

//find one
Item.get('/:id',ItemCon.findOne)

Item.use(adminAuthenticate)
//create
Item.post('/', ItemCon.create)

//delete one
Item.delete('/:id', itemAuthorize ,ItemCon.remove)

//update
Item.put('/:id', itemAuthorize ,ItemCon.update)

//update stock
Item.patch('/:id', ItemCon.stockUpdate)

module.exports = Item