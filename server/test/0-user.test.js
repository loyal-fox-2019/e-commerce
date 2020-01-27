const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const { User } = require('../models')

chai.use(chaiHttp)

describe('Testing user routes', function () {
  describe('POST /users/register', function () {
    afterEach(function (done) {
      User
        .deleteMany({ username: 'carl' })
        .then(() => {
          done()
        })
        .catch((err) => {
          done(err)
        })
    })
    describe('Register with complete request body', function () {
      it('should return access token and username', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send({ username: 'carl', email: 'carl@mail.com', password: '123456' })
          .end(function (err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('access_token')
            expect(res.body).to.have.property('username')
            expect(res.body.username).to.equal('carl')
            done()
          })
      })
    })
    describe('Register with duplicate username and email', function () {
      before(function (done) {
        User
          .create({ username: 'carl', email: 'carl@mail.com', password: '123456' })
          .then(() => {
            done()
          })
          .catch((err) => {
            done(err)
          })
      })
      it('should return a message of duplicate fieldname', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send({ username: 'carl', email: 'carl@mail.com', password: '123456' })
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).to.include('Username is used', 'Email is used')
            done()
          })
      })
    })
    describe('Register without username, email, and password', function () {
      it('should return a message of required fieldname', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send({})
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).to.include('Username is required', 'Email is required', 'Password is required')
            done()
          })
      })
    })
    describe('Register with invalid email', function () {
      it('should return a message with "email not valid" text', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send({ username: 'carl', email: 'carl', password: '123456' })
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.be.an('string')
            expect(res.body.message).to.include('Email is not valid')
            done()
          })
      })
    })
    describe('Register with password less than 6 character', function () {
      it('should return a message with "password is too short" text', function (done) {
        chai
          .request(app)
          .post('/users/register')
          .send({ username: 'carl', email: 'carl@mail.com', password: '1234' })
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).to.include('Password is too short')
            done()
          })
      })
    })
  })
  describe('POST /users/login', function () {
    before(function (done) {
      User
        .create({ username: 'carl', email: 'carl@mail.com', password: '123456' })
        .then(() => {
          done()
        })
        .catch((err) => {
          done(err)
        })
    })
    describe('Login with correct username and password', function () {
      it('should return access token and username', function (done) {
        chai
          .request(app)
          .post('/users/login')
          .send({ user: 'carl', password: '123456' })
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('access_token')
            expect(res.body).to.have.property('username')
            expect(res.body.access_token).to.be.a('string')
            expect(res.body.username).to.equal('carl')
            done()
          })
      })
    })
    describe('Login with correct email and password', function () {
      it('should return access token and username', function (done) {
        chai
          .request(app)
          .post('/users/login')
          .send({ user: 'carl@mail.com', password: '123456' })
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('access_token')
            expect(res.body).to.have.property('username')
            expect(res.body.access_token).to.be.a('string')
            expect(res.body.username).to.equal('carl')
            done()
          })
      })
    })
    describe('Login with wrong credentials', function () {
      it('should return "wrong credential" error message', function (done) {
        chai
          .request(app)
          .post('/users/login')
          .send({ username: 'carl', password: '12345678' })
          .end(function (err, res) {
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Wrong credential')
            done()
          })
      })
    })
    after(function (done) {
      User
        .deleteMany({ username: 'carl' })
        .then(() => {
          done()
        })
        .catch((err) => {
          done(err)
        })
    })
  })
})
