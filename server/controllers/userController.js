const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const { generateJWT, verifyJWT } = require('../helpers/jwt')

class UserController {
    static register(req,res,next){
        let {name,email,password, role} = req.body
        UserModel.create({
            name,
            email,
            password,
            role
        })
        .then(result=>{
            let payload = {
                userId: result._id,
                name: result.name,
                email: result.email,
                role: result.role
            }
            let token = generateJWT(payload)
            res.status(201).json({token})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static login(req,res,next){
        UserModel.findOne({
            email: req.body.email
        })
        .then(result=>{
            if(!result){
                res.status(400).json({message: "Wrong email/password"})
            }
            else {
                if(bcrypt.compareSync(req.body.password, result.password)){
                    let payload = {
                        userId: result._id,
                        name: result.name,
                        email: result.email
                    }
                    let token = generateJWT(payload)
                    res.status(200).json({token})
                }
                else {
                    res.status(400).json({message: "Wrong email/password"})
                }
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

module.exports = UserController