const User = require('../model/User');
const Item = require('../model/Item');

module.exports = {
  removeAllUser: async function() {
    if (process.env.NODE_ENV === 'testing') await User.remove();
  },
  removeAllItem: async function() {
    if (process.env.NODE_ENV === 'testing') await Item.remove()
  }
};
