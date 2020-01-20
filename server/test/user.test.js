const chai = require('chai'),
  chaiHttp = require('chai-http'),
  expect = chai.expect, 
  app = require('../app'),
  User = require('../models/user')

chai.use(chaiHttp)


after(function(done) {
  User.deleteMany({})
      .then(function() {
        console.log('User collection cleared!')
        done()
      })
      .catch(function(err) {
        console.log(err)
      })
})

describe('User CRUD', function() {
  describe('GET /users', function() {
    it('should send an array of users with status code 200', function(done) {
      // Request
      chai
        .request(app)
        .get('/users')
        .then(function(res) {
          // Assert
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
        .catch(function(err) {
          console.log(err)
        })
    })
  })
  describe('POST /register', function() {
    it('should send an object of user with status code 201', function(done) {
      // Request
      chai
        .request(app)
        .post('/register')
        .send({
          username: 'user name',
          email: 'test@mail.com',
          password: '123456'
        })
        .then(function(res) {
          // Assert
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('username')
          expect(res.body).to.have.property('password')
          expect(res.body.email).to.equal('test@mail.com')
          expect(res.body.username).to.equal('user name')
          expect(res.body.password).to.not.equal('123456')
          done();
        })
        .catch(function(err) {
          console.log(err)
        })
    })
  })
  describe('POST /login', function() {
    it('should send an user authentication token with status code 200', function(done) {
      // Request
      chai
        .request(app)
        .post('/login')
        .send({
          email: 'test@mail.com',
          password: '123456'
        })
        .then(function(res) {
          // Assert
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          done();
        })
        .catch(function(err) {
          console.log(err)
        })
    })
  })
})