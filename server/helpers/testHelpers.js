const User = require('../models/user');
const Product = require('../models/product');
const Transaction = require('../models/transaction');

module.exports = {
  createProduct: async function(obj) {
    const newProduct = await Product.create(obj);
    return newProduct;
  },
  createUser: async function(obj) {
    const newUser = await User.create(obj);
    return newUser;
  },
  deleteUsers: async function() {
    if (process.env.NODE_ENV === 'test') await User.deleteMany({});
  },
  deleteProducts: async function() {
    if (process.env.NODE_ENV === 'test') await Product.deleteMany({});
  },
  deleteTransactions: async function() {
    if (process.env.NODE_ENV === 'test') await Transaction.deleteMany({});
  }
};
