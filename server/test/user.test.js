const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = require('chai').expect
const userModel = require('../models/User')

const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQzNjg5ODU3YmQ0NzExYTBmNDQ0MiIsImlhdCI6MTU4MDM1MDg0MH0.tRPpkTqfQmQ3BHa3MtVw5zKdcwmUiqrmAKu0VvjH8z"
const custToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQzNjg5ODU3YmQ0NzExYTBmNDQ0MiIsImlhdCI6MTU4MDM1MzI1Mn0.ycUyigDgdlDoNBD052zVBy96QxC2fNefxVhRROBmXQ0"
chai.use(chaiHttp)

describe('Test user register router', function () {
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


describe('Test user login router', function () {
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

describe('Test item router', function () {
    describe('Test /items route', function () {
        it('should return items and status code 200', function (done) {
            chai.request(app)
                .get('/items')
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /items/:id route', function () {
        it('should return item and status code 200', function (done) {
            chai.request(app)
                .get('/items')
                .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQzNjg5ODU3YmQ0NzExYTBmNDQ0MiIsImlhdCI6MTU4MDM1MDg0MH0.tRPpkTqfQmQ3BHa3MtVw5zKdcwmUiqrmAKu0VvjH8zw")
                .then(function (res) {
                    expect(res).to.have.status(200)
                    expect(res.body.item)
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /items/:id route', function () {
        it('should send an error with 403 status code because token undefined', function (done) {
            chai.request(app)
                .get('/items/5e27d24d70294124842fb25a')
                .then(function (res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('You are not login')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /items/:id route', function () {
        it('should send an error with 400 status code because invalid token', function (done) {
            chai.request(app)
                .get('/items/5e27d24d70294124842fb25a')
                .set('token', wrongToken)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Not found token')
                    done()
                })
                .catch(done)
        })
    })
})

describe('Test /users/carts router', function () {
    describe('Test /users/carts route', function () {
        it('should send an error with 403 status code because token undefined', function (done) {
            chai.request(app)
                .get('/users/carts')
                .then(function (res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('You are not login')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/carts route', function () {
        it('should send an error with 400 status code because invalid token', function (done) {
            chai.request(app)
                .get('/users/carts')
                .set('token', wrongToken)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Not found token')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/carts route', function () {
        it('should send an error with 403 status code because token undefined', function (done) {
            chai.request(app)
                .patch('/users/carts')
                .then(function (res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('You are not login')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/carts route', function () {
        it('should send an error with 400 status code because invalid token', function (done) {
            chai.request(app)
                .patch('/users/carts')
                .set('token', wrongToken)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Not found token')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/carts route', function () {
        it('should send an error with 403 status code because token undefined', function (done) {
            chai.request(app)
                .delete('/users/carts')
                .then(function (res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('You are not login')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /users/carts route', function () {
        it('should send an error with 400 status code because invalid token', function (done) {
            chai.request(app)
                .delete('/users/carts')
                .set('token', wrongToken)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Not found token')
                    done()
                })
                .catch(done)
        })
    })
})

describe('Test /items router', function () {
    describe('Test /items route', function () {
        it('should send an error with 403 status code because token undefined', function (done) {
            chai.request(app)
                .post('/items')
                .then(function (res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('You are not login')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /items route', function () {
        it('should send an error with 400 status code because invalid token', function (done) {
            chai.request(app)
                .post('/items')
                .set('token', wrongToken)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Not found token')
                    done()
                })
                .catch(done)
        })
    })
    // describe.only('Test /items route', function () {
    //     it('should send an error with 401 status code because not admin', function (done) {
    //         chai.request(app)
    //             .post('/items')
    //             .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmQzNjg5ODU3YmQ0NzExYTBmNDQ0MiIsImlhdCI6MTU4MDM1NDE5MH0.qfstK5WBtJcmGqiWV4ma8smI_-yrM_nn4Wmys7VIqPM")
    //             .then(function (res) {
    //                 expect(res).to.have.status(401)
    //                 expect(res.body).to.have.property('message')
    //                 expect(res.body.message).to.equal('you not authorize')
    //                 done()
    //             })
    //             .catch(done)
    //     })
    // })
    describe('Test /items/:id route', function () {
        it('should send an error with 403 status code because token undefined', function (done) {
            chai.request(app)
                .patch('/items/5e27d24d70294124842fb25a')
                .then(function (res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('You are not login')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /items/:id route', function () {
        it('should send an error with 400 status code because invalid token', function (done) {
            chai.request(app)
                .patch('/items/5e27d24d70294124842fb25a')
                .set('token', wrongToken)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Not found token')
                    done()
                })
                .catch(done)
        })
    })

    describe('Test /items/:id route', function () {
        it('should send an error with 403 status code because token undefined', function (done) {
            chai.request(app)
                .delete('/items/5e27d24d70294124842fb25a')
                .then(function (res) {
                    expect(res).to.have.status(403)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('You are not login')
                    done()
                })
                .catch(done)
        })
    })
    describe('Test /items/:id route', function () {
        it('should send an error with 400 status code because invalid token', function (done) {
            chai.request(app)
                .delete('/items/5e27d24d70294124842fb25a')
                .set('token', wrongToken)
                .then(function (res) {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Not found token')
                    done()
                })
                .catch(done)
        })
    })
})