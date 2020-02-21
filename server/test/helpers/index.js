const User = require('../../models/User')
const Item = require('../../models/Item')
const Transaction = require('../../models/Transaction')

module.exports = {
   async clearUsers() {
      if(process.env.NODE_ENV == 'test') await User.deleteMany()
   },

   async clearItems() {
      if(process.env.NODE_ENV == 'test') await Item.deleteMany()
   },

   async clearTransactions() {
      if(process.env.NODE_ENV == 'test') await Transaction.deleteMany()
   }
}