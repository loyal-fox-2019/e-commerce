const User = require('../model/User')
const { verifyHash } = require('../helper/bcryptjs')
const { generateToken } = require('../helper/jwt')

class UserController{
    static test(req,res,next)
      {
        res.status(200).json({ status : 'User connected' })
      }


    static register(req,res,next)
      {
          const { username, firstName, lastName, email, password, role } = req.body
          
          User.create({
              username, firstName, lastName, email, password, role
          })
          .then(result=>{
              res.status(201).json(result)
          })
          .catch(err=>{
              next(err)
          })
            
      }


    static login(req,res,next)
      {
          const { email, password } = req.body

          User.findOne({
              email
          })
          .then(result=>{
              if(result)
                {
                    if(verifyHash(password, result.password))
                        res.status(200).json({
                            username : result.username,
                            token : generateToken({ _id : result._id })
                        })
                }
              else
                throw({status: 404, message: 'User not found'})
          })
          .catch(err=>{
              next(err)
          })
      }

    
    static patchUpdate(req,res,next)
      {
          const validKey = ['firstName', 'lastName', 'email', 'address']
          const reqBodyKey = Object.keys(req.body)

          const queryPatchKey = reqBodyKey.filter( key => validKey.indexOf(key) >=0 )

          let patchQuery = {}
          queryPatchKey.forEach(element => {
              patchQuery[element] = req.body[element]
          });
          console.log(`TCL: UserController -> patchQuery`, patchQuery)

          if(req.body.file)
            patchQuery.profilePicture = req.body.file

          User.findOneAndUpdate(
            { _id: req.params.userId },
            patchQuery,
            { runValidators: true}
          )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
                

      }


}

module.exports = UserController