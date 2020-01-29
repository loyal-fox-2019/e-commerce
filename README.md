# e-commerce

link deploy 
http://ecommerce.japhendywijaya.xyz/

link dokumentasi
https://documenter.getpostman.com/view/9584254/SWTBcwxD?version=latest#3b079ae7-e469-4aa9-80f0-33b157ddabd6

additional feature:
* merge duplicate when creating transactions

* aggregate find result grouped by seller id

* when customer checkout :
    - bulk item stock checking
        kalo ada 1 nya yang itemnya kurang, maka langsung cancel semua
    - bulk item stock update
        pake model.bulkwrite([{}])
    - bulk transaction status udpate jadi paid semua
        pake updateMany
    - cart created
    

* new found error type
    router.post('/', stockChecking, TxController.createTransaction, TxController.patchUpdateAmount)
        bisa mengakibatkan Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        = double res.status
        
        solvingnya dipakein 
        .then(result=>{
              if(!req.redirectStatus)
                res.status(200).json(result)
          })

* incorporating buyer and seller flow of information

