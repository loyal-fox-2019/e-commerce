const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/User')
const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

before(function(done) {
  User.create({
    name: 'test account',
    email: 'test@mail.com',
    password: '123456'
  })
    .then(() => {
      console.log('test user created')
      done()
    })
    .catch(console.log)
});

after(function(done) {
  User.deleteMany()
    .then(() => {
      console.log('test user deleted')
      done()
  })
    .catch(console.log)
});

describe('/POST /login', function() {

  it('should return status 200 and token', function(done) {
    chai.request(app)
      .post('/login')
        .send({
          email: 'test@mail.com',
          password: '123456'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('name', 'token')
          done()
        })
  })
    
  it('should return status 400, Invalid Email or Password', function(done) {
    chai.request(app)
      .post('/login')
        .send({
          email: 'test@mail.com',
          password: 'password'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message', 'Invalid Email or Password')
          done() 
        })
  })

  it('should return status 400, Invalid Email or Password', function(done) {
    chai.request(app)
      .post('/login')
        .send({
          email: 'master@mail.com',
          password: '111111'
        })
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message', 'Invalid Email or Password')
          done()
        })
  })

})

describe('/POST /register', function() {

    it('should return user token', function(done) {
        chai.request(app)
        .post('/register')
        .send({
            name: 'john doe',
            email: 'john@mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.all.keys('name', 'token')
            done()
        })
    })

    it('should return message, Name cannot be empty', function(done) {
        chai.request(app)
        .post('/register')
        .send({
            name: '',
            email: 'john@mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Name cannot be empty')
            done()
        })
    })

    it('should return message, Email cannot be empty', function(done) {
        chai.request(app)
        .post('/register')
        .send({
            name: 'john doe',
            email: '',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Email cannot be empty')
            done()
        })
    })

    it('should return message, Email not valid', function(done) {
        chai.request(app)
        .post('/register')
        .send({
            name: 'john doe',
            email: 'not valid mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Your email is not valid')
            done()
        })
    })

    it('should return message, Email already registered', function(done) {
        chai.request(app)
        .post('/register')
        .send({
            name: 'john doe',
            email: 'john@mail.com',
            password: '123456'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Email already registered')
            done()
        })
    })

    it('should return message, Password cannot be empty', function(done) {
        chai.request(app)
        .post('/register')
        .send({
            name: 'john doe',
            email: 'john@mail.com',
            password: ''
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Password cannot be empty')
            done()
        })
    })

    it('should return message, Password at least have 6 character', function(done) {
        chai.request(app)
        .post('/register')
        .send({
            name: 'john doe',
            email: 'john@mail.com',
            password: '12'
        })
        .end(function(err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.be.an('array').that.include('Password at least have 6 character')
            done()
        })
    })
})
