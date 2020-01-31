const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const User = require('../models/user')
chai.use(chaiHttp)
const expect = chai.expect

before(function(){
    // console.log(User)
    return User.deleteMany({})
    .then(()=>{
        console.log('cleaned up')
        // done()
    })
    .catch(err=>{
        console.log(err)
        // done()
    })
    .finally(()=>{
        // done()
    })
})

describe('USER Routes', function(){
    
    describe('POST /register', function(){
        it.only('should get an object with status code 201', function(done){
            // console.log("before chai-http")
            chai
                .request(app)
                .post('/user/register')
                .send({
                    username: 'serafim',
                    email: '123@mail.com',
                    password: 'sera'
                })
                .then((res)=>{
                    // console.log('==== create user', res.body._)
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('username')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body.username).to.equal('serafim')
                    expect(res.body.email).to.equal('123@mail.com')
                    expect(res.body.password).to.not.equal('sera')
                    done()
                })
                .catch(err=>{
                    console.log(err, "test")
                })
                .finally(()=>{
                    done()
                })
            })
        })
        it('should get an error status 400', function(done){
            chai
                .request(app)
                .post('/user/register')
                .send({
                    username: '',
                    email: '.com',
                    password: ''
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    describe('POST /login', function(){
        it.only('should get status 200 and an object {token, username, email}', function(done){
            chai
                .request(app)
                .post('/user/login')
                .send({
                    email: '123@mail.com',
                    password: 'sera'
                })
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    expect(res.body.payload).to.have.property('_id')
                    expect(res.body.payload).to.have.property('email')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
            
        })
    })