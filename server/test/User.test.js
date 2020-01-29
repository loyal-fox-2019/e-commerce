const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../model/User');
const expect = chai.expect;
const { removeAllUser } = require('./testHelper');
chai.use(chaiHttp);

let newUser = {
    username: 'jap',
    firstName: 'jap',
    lastName: 'hendy wijaya',
    email: 'jap@mail.com',
    password: '1234'
}

let newUserLogin = {
    email: 'jap@mail.com',
    password: '1234'  
}


before(function() {
    const initUser = {
      username: 'Dummy',
      email: 'dummy@mail.com',
      password: '123456'
    }

    User
        .create(initUser)
        .then(user => console.log('testing: success create initial user'))
        .catch(console.log)
})

describe('User Routes', function() {
    this.timeout(5000)
    after(async function() {
        await removeAllUser();
      })
    describe('POST /users/register', function() {
        describe('success process', function() {
            it('should send an object (name, email, token) with 201 status code', function(done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send(newUser)
                    .end(function(err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object').to.have.any.keys('_id', 'firstName', 'lastName', 'fullName', 'email', 'token')
                        expect(res.body.fullName).to.be.a('string').to.equal('Jap Hendy Wijaya')
                        expect(res.body.email).to.be.a('string').to.equal('jap@mail.com')
                        expect(res.body.token).to.be.a('string')
                        done()
                    })
            })
        })
        describe('errors process', function() {
            it('should send an error with 406 status code because missing any or all required value', function(done) {
              const blankInput = {}
              
              chai.request(app)
              .post('/users/register')
              .send(blankInput)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(406)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.be.an('array').that.includes('Username must be provided')
                expect(res.body.message).to.be.an('array').that.includes('Complete registration using first name')
                expect(res.body.message).to.be.an('array').that.includes('Email must be provided')
                expect(res.body.message).to.be.an('array').that.includes('Password must be provided')
                done()
              })
            })
            it('should send an error with 406 status code because duplicate data', function(done) {
              chai.request(app)
              .post('/users/register')
              .send(newUser)
              .end(function(err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(406)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.equal('username has been used')
                done()
              })
            })
        })
    })
    describe('POST /login', function() {
        describe('success process', function() {
          it('should send an object (message, token) with 200 status code', function(done) {
            chai.request(app)
            .post('/users/login')
            .send(newUserLogin)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('object').to.have.any.keys('_id', 'username', 'firstName', 'lastName', 'fullName', 'description', 'email', 'profilePicture', 'token' )
              expect(res.body.username).to.be.a('string').to.equal('jap')
              expect(res.body.email).to.be.a('string').to.equal('jap@mail.com')
              expect(res.body.token).to.be.a('string')
              done()
            })
          })
        })
        describe('errors process', function() {
          it('should send an error with 403 status code because missing any required value', function(done) {
            const blankLogin = {}
            
            chai.request(app)
            .post('/users/login')
            .send(blankLogin)
            .end(function(err, res){
              expect(err).to.be.null
              expect(res).to.have.status(403)
              expect(res.body).to.be.an('object').to.have.any.keys('message')
              expect(res.body.message).to.equal('Requirement not fulfilled')
              done()
            })
          })
          
          it('should send an error with 403 status code because invalid password', function(done) {
            const falsePassword = { ...newUserLogin }
            falsePassword.password = 'passwordNgasal'

            chai.request(app)
            .post('/users/login')
            .send(falsePassword)
            .end(function(err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(403)
              expect(res.body).to.be.an('object').to.have.any.keys('message')
              expect(res.body.message).to.equal('email & password combination wrong or user not found')
              done()
            })
          })
        })
    })
})