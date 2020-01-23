# e-commerce

additional feature:
* find duplicate when creating transactions

* aggregate grouping by seller id

* when customer checkout :
    - bulk item stock checking
        - kalo ada 1 nya yang itemnya kurang, maka langsung cancel semua
    - item stock update
        pake model.bulkwrite([{}])
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
