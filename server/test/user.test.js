const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/user')

const app = require('../app')

chai.use(chaiHttp)

const expect = chai.expect

before(function(){
    User.deleteMany({})
    .then(function(){
        console.log('Users collection cleared')
    })
    .catch(function(err){
        console.log(err);
    })
})

after(function(){
    User.deleteMany({})
    .then(function(){
        console.log('Users collection cleared')
    })
    .catch(function(err){
        console.log(err);
    })
})

describe('REGISTER LOGIN USER', function(){
    describe('POST /users/register', function(){
        it('should return token with status code 201', function(done){
            chai.request(app)
            .post('/users/register')
            .send({
                name: "tes",
                email: "tes@mail.com",
                password: "secret",
                role: "admin"
            })
            .then(function(res){
    
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                
                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
    describe('POST /users/login', function(){
        it('should return token with status code 200', function(done){
            chai.request(app)
            .post('/users/login')
            .send({
                email: "tes@mail.com",
                password: "secret"
            })
            .then(function(res){
    
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                
                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })
})