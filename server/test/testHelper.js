let User = require('../models/user')
let Product = require('../models/product')

module.exports = {
    createUser: function (data) {
        return User.create(data)
            .then((result) => {
                // console.log(result, 'ini rresult dari helper');
                return result
            }).catch((err) => {
                // console.log(err, 'ini error create user');
                return err
            });
    },
    deleteUser: async function () {
        if (process.env.NODE_ENV == 'test') return await User.deleteMany({})
    },
    createProduct: async function (data) {
        return await Product.create(data)
            .then((result) => {
                return result
            }).catch((err) => {
                return err
            })
    },
    deleteProduct: async function () {
        if (process.env.NODE_ENV == 'test') return await User.deleteMany({})
    }
}