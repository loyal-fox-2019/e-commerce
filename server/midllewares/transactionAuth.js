const Transaction = require('../models/Transaction')

module.exports = {
    transactionAuthorize : (req,res,next) => {
        Transaction.findOne({
            _id: req.params.id
        })
        .then(data=>{
            if(data){
                if(String(data.seller) === req.user._id || String(data.customer) === req.user._id){
                    next()
                }else{
                    next({
                        status : 401,
                        message : 'Not Authorized'
                    })
                }
            }else{
                next({
                    status : 404,
                    message : 'item not found'
                })
            }
        })
        .catch(next)
    }
}