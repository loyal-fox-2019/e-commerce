const Transaction = require('../model/transaction');

class TransactionController {
    static checkoutCart(req, res, next) {
        Transaction.create({
            user: req.userId,
            status: 'paid',
            item: req.body.item,
            totalPrice: req.body.totalPrice,
            paidType: req.body.paidType,
            createdAt: new Date()
        }).then(response => {
            console.log(response);
            res.status(200).json({
                message: "Transaction created",
                data: response
            })
        }).catch(next)
    }

    static updateStatus(req, res, next) {
        Transaction.updateOne({
            _id: req.params.id
        },{
            status: 'done',
        }).then(response => {
            console.log(response);
            res.status(200).json({
                message: "Status updated",
                data: response
            })
        }).catch(next)
    }
}

module.exports = TransactionController;