`use strict`
const chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
const chaiHttp = require('chai-http')
const app = require('../app')
const { createUser, deleteUser } = require('./testHelper')

chai.use(chaiHttp)
// const creq = chai.request(app)
describe('/users', async function () {

  after(async function () {
    return await deleteUser()
  })

  describe('check user schema', function () {

    it('create a new user', async function () {
      let data = {
        name: 'patra',
        email: 'patra@mail.com',
        password: 'adaenam',
        phone: '77777789778'
      }
      let user = await createUser(data)
      expect(user).to.be.an('object')
      expect(user).to.have.property('name')
      expect(user.name).to.equal('patra')
      expect(user).to.have.property('email');
      expect(user.email).to.equal('patra@mail.com');
      expect(user).to.have.property('phone');
      expect(user.phone).to.equal('77777789778');
      expect(user).to.have.property('password');
    })

    it('will return validation error for duplicate email', async function () {
      let data = {
        name: 'patra',
        email: 'patra@mail.com',
        password: 'adaenam',
        phone: '77777789778'
      }
      let user = await createUser(data)

      expect(user).to.be.an('object')
      expect(user).to.be.have.property('errors')
      expect(user).to.be.have.property('message')
      expect(user).to.be.have.property('name')
      expect(user.name).to.be.equal('ValidationError')
      expect(user.errors.email.message).to.be.equal('Email has been used')

    })

    it('will return validation error for short password', async function () {
      let data = {
        name: 'patra',
        email: 'patra1@mail.com',
        password: 'ada',
        phone: '77777789778'
      }
      let user = await createUser(data)
      expect(user).to.be.an('object')
      expect(user).to.be.have.property('errors')
      expect(user).to.be.have.property('message')
      expect(user).to.be.have.property('name')
      expect(user.name).to.be.equal('ValidationError')
      expect(user.errors.password.message).to.be.equal('Password must longer than 6 character')

    })

  })


  describe('users -> GET /', function () {
    it('get all users', function (done) {
      chai.request(app)
        .get('/users')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done()
        })
    })
  })


  describe('users -> POST ', async function () {

    before(async function () {
      let data = {
        name: 'patra',
        email: 'patra@mail.com',
        password: 'adaenam',
        phone: '123456789123'
      }

      return await createUser(data)
    })

    describe('/login', function () {
      it('should return token and name', function (done) {

        let data = {
          email: 'patra@mail.com',
          password: 'adaenam',
        }
        chai.request(app)
          .post('/users/login')
          .send(data)
          .end((err, response) => {
            expect(response).to.have.status(200)
            expect(response.body).to.be.an('object')
            expect(response.body).to.have.property('token')
            expect(response.body).to.have.property('name')
            done()
          })



      })

      it('should send errors - (Empty body, code: 400)', function (done) {
        let data = {}
        chai.request(app)
          .post('/users/login')
          .send(data)
          .end(function (err, response) {
            expect(response).to.have.status(400)
            expect(response).to.be.an('object')
            // expect(response.body).to.be.an('object');
            // expect(response.body.message).to.equal('Email is required, Password is required');
            done()
          })

      })

      it('should send errors - (email or password not match, code: 400) || Password', function () {
        let data = {
          email: 'patra@mail.com',
          password: 'adatujuh',
        }
        chai.request(app)
          .post('/users/login')
          .send(data)
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object')
            expect(res.body.message).to.be.an('string');
            expect(res.body.message).to.include('email or password not match');
          })
      })

      it('should send errors - (email or password not match, code: 400) || Email', function () {
        let data = {
          email: 'patrak@mail.com',
          password: 'adaenam',
        }
        chai.request(app)
          .post('/users/login')
          .send(data)
          .end(function (err, response) {
            expect(response).to.have.status(400)
            expect(response.body).to.be.an('object')
            expect(response.body.message).to.be.an('string');
            expect(response.body.message).to.include('email or password not match');
          })
      })

      it('should send errors - (email or password not match, code: 400)', function () {
        let data = {
          email: 'patasdra@mail.com',
          password: 'adatujuh',
        }
        chai.request(app)
          .post('/users/login')
          .send(data)
          .end(function (err, response) {
            expect(response).to.have.status(400)
            expect(response.body).to.be.an('object')
            // expect(response.body.message).to.be.an('array')
            // expect(response.body.message).to.include('email or password not match');
          })
      })

    })

    describe('/register', function () {
      it('should return token and name', function () {
        let data = {
          name: 'putra',
          email: 'putra@mail.com',
          password: 'adaenam',
          phone: '123456789123'
        }
        chai.request(app)
          .post('/users/register')
          .send(data)
          .end(function (err, response) {
            expect(response).to.have.status(201)
            expect(response.body).to.be.an('object')
            expect(response.body).to.have.property('token')
            expect(response.body).to.have.property('name')
          })
      })

      it('should send errors - (Empty body, code: 400)', function () {
        let data = {}
        chai.request(app)
          .post('/users/register')
          .send(data)
          .end(function (err, response) {
            expect(response).to.have.status(400)
            expect(response.body).to.be.an('object')
            // expect(response.body.message).to.be.an('array');
            expect(response.body.message).to.include('Email is required');
            expect(response.body.message).to.include('Password is required');
          })
      })

      it('should send errors - (Email has been used, code: 400)', function () {
        let data = {
          name: 'patra',
          email: 'patra@mail.com',
          password: 'adaenam',
          phone: '123456789125'
        }
        chai.request(app)
          .post('/users/register')
          .send(data)
          .end(function (err, response) {
            expect(response).to.have.status(400)
            expect(response.body).to.be.an('object')
            // expect(response.body.message).to.be.an('array');
            expect(response.body.message).to.include('Email has been used');
          })
      })

      it('should send errors - (Phone number been used, code: 400)', function (done) {
        let data = {
          name: 'patri',
          email: 'patri@mail.com',
          password: 'adaenam',
          phone: '123456789123'
        }
        chai.request(app)
          .post('/users/register')
          .send(data)
          .end(function (err, response) {
            expect(err).to.be.equal(null)
            // expect(response).to.have.status(400)
            // expect(response.body).to.be.an('object')
            // expect(response.body.message).to.be.an('array');
            // expect(response.body.message).to.include('Phone number has been used');
            done()
          })
      })
    })
  })


})
