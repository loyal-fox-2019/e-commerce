const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const userModel = require('../models/User')



chai.use(chaiHttp)

describe('test user route /users', function() {
    before(function(){
        userModel.deleteMany({name : 'user'},function(err,data){
            if (err) {
                console.log(err)
              } else {
                console.log('delete succsess');
              }
        })
    })
    describe('POST /resgiter', function() {
      it('should return user data and code 201', function(done) {
        chai.request(app)
        .post('/users/register')
        .send({
            name: 'user',
            email: 'user@mail.com',
            password: '123456',
            phoneNumber: '081234567890'
        })
        .then(function(res) {
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('message').equal('register succesfully')
            expect(res.body).to.have.property('token').equal(res.body.token)
            expect(res.body).to.have.property('user').equal(res.body.user)
            done()
        })
        .catch(done)
      });
    });
    describe('Test validation name',function(){
        it('should return status 400 when object name is empty', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: '',
                    email: 'user2@mail.com',
                    password: '123456',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    // console.log('bodyNya =====>', res.body.message)
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('you must enter your name')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test validation email',function(){
        it('should return status 400 when object email is duplicate', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'user@mail.com',
                    password: '123456',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('email already registered')
                    done()
                })
                .catch(done)
        })
        it('should return status 400 when object email is not email', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'usermail',
                    password: '123456',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Invalid email format')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test validation password',function(){
        it('should return status 400 when object password length less then 6', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'user2@mail.com',
                    password: '12345',
                    phoneNumber: '081234567890'
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('minimum password length is 6 characters')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test validation phoneNumber',function(){
        it('should return status 400 when object phoneNumber is empty', function(done){
            chai.request(app)
                .post('/users/register')
                .send({
                    name: 'user',
                    email: 'user2@mail.com',
                    password: '123456',
                    phoneNumber: ''
                })
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('you must enter your phone number')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/login route', function() {
        it('should return (message,user,token) and status code 200', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'user@mail.com',
                    password: '123456'
                })
                .then(function(res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token').equal(res.body.token)
                    expect(res.body).to.have.property('user').equal(res.body.user)
                    expect(res.body).to.have.property('message').equal(res.body.message)
                    token = res.body.token
                    done()
                })
                .catch(done)
        })
        it('should return status 404 when email is not registered', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'user3@mail.com',
                    password: '123456'
                })
                .then(function(res) {
                    expect(res).to.have.status(404)
                    expect(res.body).to.have.property('message').equal('user not found')
                    done()
                })
                .catch(done)
        })
        it('should return status 403 when password is wrong', function(done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'user@mail.com',
                    password: '1234'
                })
                .then(function(res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message').equal('Wrong Password')
                    done()
                })
                .catch(done)
        })
    })
  });