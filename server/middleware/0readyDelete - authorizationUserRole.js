module.exports = function(role){
    return (req,res,next)=>{
    console.log(`
        AUTHORIZATION USER ROLE ${role} IS RUNNING
        ==========================================
    `);

    if(req.decodedUser.role === role)
      {
          console.log(`AUTHORIZATION USER ROLE ${role} PASSED`);
          next()
      }
    else
      {
          next({status:403, message:'unAuthorized Access'})
      }
    }   
}