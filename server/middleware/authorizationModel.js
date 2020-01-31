module.exports = function(model, role){
    return (req,res,next)=>{
    console.log(`
        AUTHORIZATION ${model} IS RUNNING
        =================================
    `);

    const unAuthorizedError = {
        status:403,
        message: 'unAuthorized Access'
    }
    
    const queryModel = require(`../model/${model}`)
    const key = Object.keys(req.params)

    queryModel.findOne({
        _id : req.params[key]
    })
    .then(result=>{
    // console.log(`TCL: result`, result)
    // console.log(`TCL: req.decodedUser`, req.decodedUser)
    
        if(!result)
          next({ status: 404, message: 'resource not found'})
        else{
              if(model === 'User')
                {
                    if( String(result._id) === String(req.decodedUser._id) ){
                        console.log(` \n======================\n AUTHORIZATION ${model} passed`)
                        next()
                      }
                    else
                      throw(unAuthorizedError)
                }
              else if(model === 'Item')
                {
                    if( String(result.SellerId) === String(req.decodedUser._id)){
                        console.log(` \n======================\n AUTHORIZATION ${model} passed`)
                        next()
                     }
                    else 
                      throw(unAuthorizedError)
                }
              else if(model === 'Transaction' )
                {
                    if( String(result.BuyerId) === String(req.decodedUser._id)){
                        console.log(` \n======================\n AUTHORIZATION ${model} passed`)
                        next()
                    }
                    else 
                      throw(unAuthorizedError)
                }
              else if(model === 'Invoice')
                {
                  if( role === 'Buyer' && String(result.BuyerId) === String(req.decodedUser._id)){
                      console.log(` \n======================\n AUTHORIZATION ${model} passed`)
                      next()
                  }
                  else if( role === 'Seller' && String(result.SellerId) === String(req.decodedUser._id)){
                      console.log(` \n======================\n AUTHORIZATION ${model} passed`)
                      next()
                  }
                  else if( role === 'Either'){
                      if(String(result.BuyerId) === String(req.decodedUser._id) || String(result.SellerId) === String(req.decodedUser._id)){
                          console.log(` \n======================\n AUTHORIZATION ${model} passed`)
                          req.invoiceFindResult = result
                          next()
                      }
                      else
                        throw(unAuthorizedError)
                  }
                  else
                    throw(unAuthorizedError)
                }
              

          }
    })
    .catch(err=>{
        next(err)
    })
    }
}