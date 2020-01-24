const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/userModel');
const expect = chai.expect;
chai.use(chaiHttp)

let testUserRegister = {
    email : 'jovipetraratulngi@gmail.com',
    password : 'password',
    name : 'Jovi Petra',
    phone : '089626886519',
    address : 'jakarta',
    age : '21',
    gender : 'male'
}

let testUserLogin = {
    email : 'jovipetraratulangi@gmail.com',
    password : 'password'
}

// before(function(){
//     const initUser = {
//         email : 'dummy@dummy.com',
//         password : 'dummy',
//         name : 'Dummy',
//         phone : '08888888888',
//         address : 'dumkarta',
//         age : '99',
//         gender : 'male'
//     }

//     User.create(initUser)
//     .then(user =>{
//         console.log('inital user created')
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

describe('User route', function(){
    describe('POST /user/register', function(){
        describe('Success register new user', function(){
            it('should send an object containing request body with 201 code', function(done){
                chai
                    .request(app)
                    .post('/user/register')
                    .send(testUserRegister)
                    .end(function(err,res){
                        expect(err).to.be.a.null
                        expect(res).to.have.status(201)
                        expect(res.body.email).to.be.a('string').equal.to('jovipetraratulangi@gmail.com')
                        console.log(err)
                        done()
                    })
            })
        })
        // describe('Register failed', function(){
        //     it('should send an object containing error message : user already registered with status 400', function(){
        //         chai
        //             .request(app)
        //             .post('/user/register')
        //             .send(testUserRegister)
        //             .end(function(err,res){
        //                 expect(res.email).to.equal('jovipetraratudsssdlangi@gmail.com')
        //             })
        //     })
        // })
    })
})