const Transaction = require('../model/transaction');
const Item = require('../model/item');

const authorizationTransaction = (req, res, next) => {
    Transaction.findOne({
        user: req._id
    }).then(response => {
        if (response) {
            next()
        } else {
            throw ({code: 401});
        }
    }).catch(next);
};

const authorizationItem = (req, res, next) => {
    Item.findOne({
        owner: req._id,
        _id: req.params.id
    }).then(response => {
        if (response) {
            next()
        } else {
            throw ({code: 401});
        }
    }).catch(next);
};

module.exports = {
    authorizationTransaction,
    authorizationItem
};