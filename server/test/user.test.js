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
  // describe('GET /users', function() {
  //   it('should send an array of users with status code 200', function(done) {
  //     // Request
  //     chai
  //       .request(app)
  //       .get('/users')
  //       .then(function(res) {
  //         // Assert
  //         expect(res).to.have.status(200)
  //         expect(res.body).to.be.an('array')
  //         done()
  //       })
  //       .catch(function(err) {
  //         console.log(err)
  //       })
  //   })
  // })
  describe('POST /register', function() {
    it('should send an object of user with status code 201', function(done) {
      // Request
      chai
        .request(app)
        .post('/register')
        .send({
            "profile_pic": "https://storage.googleapis.com/bucket.amilhasbala.com/1579934408895-user.png",
            "username": "John Doe",
            "email": "JohnDoe@mail.com",
            "password": "123456"
        })
        .then(function(res) {
          // Assert
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          expect(res.body).to.have.property('username')
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
          email: 'JohnDoe@mail.com',
          password: '123456'
        })
        .then(function(res) {
          // Assert
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          expect(res.body).to.have.property('username')
          done();
        })
        .catch(function(err) {
          console.log(err)
        })
    })
  })
})