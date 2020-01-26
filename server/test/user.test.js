const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const dropUser = require('../helpers/dropUser')

chai.use(chaiHttp)

before(function(done) {
  dropUser(done)
})

after(function(done) {
  dropUser(done)
})

var token

describe('User Testing', function() {
  describe('POST /users/register', function() {
    it('should register successfully with status code 201', function(done) {
      let user = {
        name: 'Samuel Zega',
        password: 'password',
        email: 'samuelzega9@gmail.com'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(result => {
          // console.log(result.body)
          expect(result).to.have.status(201)
          expect(result.body).to.be.an('object')
          expect(result.body).to.have.keys([
            '__v',
            '_id',
            'balance',
            'email',
            'imageUrl',
            'name',
            'password',
            'role'
          ])
          expect(result.body.name).to.equal('Samuel Zega')

          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })

    it('shold error with code 400', function(done) {
      let errorUser = {}
      chai
        .request(app)
        .post('/users/register')
        .send(errorUser)
        .then(result => {
          // console.log(result.body.message)
          expect(result).to.have.status(400)
          expect(result.body.message).to.include('validation')
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })

    it('should register an admin successfully with status code 201', function(done) {
      let user = {
        name: 'Admin',
        password: 'password',
        email: 'admin@mail.com',
        admin_password: 'password'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(result => {
          // console.log(result.body)
          expect(result).to.have.status(201)
          expect(result.body).to.be.an('object')
          expect(result.body).to.have.keys([
            '__v',
            '_id',
            'balance',
            'email',
            'imageUrl',
            'name',
            'password',
            'role'
          ])
          expect(result.body.name).to.equal('Admin')

          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })

    it('should failed to register an admin(wrong admin password) with status code 400', function(done) {
      let user = {
        name: 'Samuel Zega',
        password: 'password',
        email: 'samuelzega9@gmail.com',
        admin_password: 'passwordSalah'
      }
      chai
        .request(app)
        .post('/users/register')
        .send(user)
        .then(result => {
          // console.log(result.body.message)
          expect(result).to.have.status(400)
          expect(result.body).to.be.an('object')
          expect(result.body.message).to.equal(
            'Incorrect password for register as admin'
          )
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })
  })

  describe('POST /users/login', function() {
    it('should succes login with status code 200', function(done) {
      let user = {
        email: 'samuelzega9@gmail.com',
        password: 'password'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(user)
        .then(result => {
          expect(result).to.have.status(200)
          token = result.body.token
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })

    it('should failed login with wrong email/password status code 400', function(done) {
      let randomUser = {
        email: 'randomuser@mail.com',
        password: 'password123'
      }
      chai
        .request(app)
        .post('/users/login')
        .send(randomUser)
        .then(result => {
          // console.log(result.body.message)
          expect(result).to.have.status(400)
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })
  })

  describe('POST /users/logout', function() {
    it('should logout successfully with status code 200', function(done) {
      chai
        .request(app)
        .post('/users/logout')
        .set({ token: token })
        .then(result => {
          expect(result).to.have.status(200)
          expect(result.body.message).to.equal('Successfully logout')
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })

    it('should failed logout with status code 403', function(done) {
      chai
        .request(app)
        .post('/users/logout')
        .then(result => {
          // console.log(result.body);
          expect(result).to.have.status(403)
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })
  })

  describe('GET /users', function() {
    it('should get users successfully with status code 200', function(done) {
      chai
        .request(app)
        .get('/users')
        .set({ token: token })
        .then(result => {
          // console.log(result.body)
          expect(result).to.have.status(200)
          expect(result.body).to.have.keys([
            '_id',
            'balance',
            'email',
            'imageUrl',
            'name',
            'role'
          ])
          done()
        })
        .catch(err => {
          console.log(err)
          done()
        })
    })
  })
})
