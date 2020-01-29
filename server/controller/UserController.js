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
          const { username, firstName, lastName, email, password } = req.body
          
          User.create({
              username, firstName, lastName, email, password
          })
          .then(result=>{
              res.status(201).json({
                  _id: result._id,
                  username: result.username,
                  firstName: result.firstName,
                  lastName: result.lastName,
                  fullName: result.fullName,
                  email: result.email,
                  token : generateToken({ _id : result._id })
              })
          })
          .catch(err=>{
              next(err)
          })
            
      }


    static login(req,res,next)
      {
          const { email, password } = req.body
          if( !email || !password)
            throw({ status: 403, message:'Requirement not fulfilled'})

          User.findOne({
              email
          })
          .then(result=>{
              if(result)
                {
                    if(verifyHash(password, result.password))
                        res.status(200).json({
                            
                            _id: result._id,
                            username: result.username,
                            firstName: result.firstName,
                            lastName: result.lastName,
                            fullName: result.fullName,
                            description: result.description,
                            email: result.email,
                            profilePicture: result.profilePicture,
                            address: result.address,
                            token : generateToken({ _id : result._id })
                        })
                      else
                        throw({ status: 403, message: 'email & password combination wrong or user not found'})
                }
              else
                throw({status: 403, message: 'email & password combination wrong or user not found'})
          })
          .catch(err=>{
              next(err)
          })
      }


    static getUserDetail(req,res,next)
      {
          const { _id, username, firstName, lastName, fullName, description, address, profilePicture, email } = req.decodedUser
          res.status(200).json({
            _id, username, firstName, lastName, fullName, description, address, profilePicture, email
          })
      }
    

    static getOtherUserDetail(req,res,next)
      {
          User.findOne({
              _id : req.params.userId
          })
          .then(result=>{
              const { _id, username, fullName, email, profilePicture, description } = result
              res.status(200).json({ _id, username, fullName, email, profilePicture, description })
          })
          .catch(err=>{
              next(err)
          })
      }
      
    static patchUpdate(req,res,next)
      {
          const validKey = ['firstName', 'lastName', 'email', 'address', 'description']
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