const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = require('chai').expect
const userModel = require('../models/User')

chai.use(chaiHttp)

describe.only('Test user register router', function () {
    before(function () {
        userModel.deleteMany({ username: 'azp' }, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('delete succsess');
            }
        })
    })
    describe('Test /users/register route', function () {
        it('should return user, token and status code 201', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azp@gmail.com',
                    password: '123456',
                    phone: '081234567890',
                    role: 'customer'
                })
                .then(function (res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('user').to.equal(res.body.user)
                    expect(res.body).to.have.property('token').to.equal(res.body.token)
                    done()
                })
                .catch(done)
        })
    })
    describe('Test validation username', function () {
        it('should return status code 400 when property username is empty', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: '',
                    email: 'azp@gmail.com',
                    password: '123',
                    phone: '081382062349'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('please fill username')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation email', function () {
        it('should return status code 400 when property email is empty', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: '',
                    password: '123',
                    phone: '081382062349'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('please fill email')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation password', function () {
        it('should return status code 400 when property password is empty', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azp@gmail.com',
                    password: '',
                    phone: '081382062349'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('please fill password')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation phone', function () {
        it('should return status code 400 when property phone is empty', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azp@gmail.com',
                    password: '123123',
                    phone: ''
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('please fill phone')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation email type', function () {
        it('should return status code 400 when property email not use @ and .', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azpgmail.com',
                    password: '123',
                    phone: '081382062349'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Invalid email')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation email unique', function () {
        it('should return status code 400 when property email duplicate', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azp@gmail.com',
                    password: '123123',
                    phone: '081382062349'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Email address already registered')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation password min length', function () {
        it('should return status code 400 when property password length less than 6', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azpa',
                    email: 'azp1@gmail.com',
                    password: '123',
                    phone: '081382062349'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Min password 6')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation username max length', function () {
        it('should return status code 400 when property username length more than 10', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azpazpazpazp',
                    email: 'azp@gmail.com',
                    password: '123',
                    phone: '081382062349'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Max username 10')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation phone max length', function () {
        it('should return status code 400 when property phone length more than 13', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azp',
                    email: 'azp@gmail.com',
                    password: '123123',
                    phone: '0813820623491234'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Max phone number 13')
                    done()
                }).catch(done)
        })
    })
    describe('Test validation phone min length', function () {
        it('should return status code 400 when property phone length less than 10', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    username: 'azpa',
                    email: 'azp1@gmail.com',
                    password: '123123',
                    phone: '081382062'
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('Min phone number 10')
                    done()
                }).catch(done)
        })
    })
})


describe.only('Test user login router', function () {
    describe('Test /users/login route', function () {
        it('should return user, token and status code 200', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'azp@gmail.com',
                    password: '123456',
                })
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('user').to.equal(res.body.user)
                    expect(res.body).to.have.property('token').to.equal(res.body.token)
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/login route', function () {
        it('should return status code 400 when email or password wrong', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'azp1@gmail.com',
                    password: '123456',
                })
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('email/password wrong')
                    done()
                })
                .catch(done)
        })
    })
})