'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

after(done => {
  User
    .deleteMany({}, () => {
      done()
    })
})

describe('Users Route Testing..', function () {
  describe('POST /register', function () {
    it('should return status code 201 with response body created user', function (done) {
      let user = {
        first_name: 'Uzumaki',
        last_name: 'Naruto',
        email: 'naruto@mail.com',
        password: 'naruto123',
        role: 'customer'
      }
      chai
        .request(app)
        .post(`/register`)
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body.regUser).to.have.property('_id')
          expect(res.body.regUser).to.have.property('first_name')
          expect(res.body.regUser).to.have.property('last_name')
          expect(res.body.regUser).to.have.property('email')
          expect(res.body.regUser).to.have.property('password')
          expect(res.body).to.have.property('message')
          expect(res.body.regUser.email).to.be.equal('naruto@mail.com')
          expect(res.body.regUser.email).to.not.be.equal('sasuke@mail.com')
          done()
        })
    })

    it(`should return status code 500 with message "Email already exist"`, function (done) {
      let user = {
        first_name: 'Uzumaki',
        last_name: 'Naruto',
        email: 'naruto@mail.com',
        password: 'naruto123',
        role: 'customer'
      }
      chai
        .request(app)
        .post(`/register`)
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.be.equal('User validation failed: email: Email already exists')
          done()
        })
    })

    it(`should return status code 500 with message "Not a Valid Email Format"`, function (done) {
      let user = {
        first_name: 'Uzumaki',
        last_name: 'Naruto',
        email: 'narutocom',
        password: 'naruto123',
        role: 'customer'
      }
      chai
        .request(app)
        .post(`/register`)
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.be.equal('User validation failed: email: Not a valid Email Format')
          done()
        })
    })

    it(`should return status 500 with object "First Name is required"`, function (done) {
      chai
        .request(app)
        .post("/register")
        .send({
          first_name: '',
          last_name: 'Naruto',
          email: 'naruto@mail.com',
          password: 'naruto123',
          role: 'customer'
        })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("First Name is required")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })

    it(`should return status 500 with object "Last Name is required"`, function (done) {
      chai
        .request(app)
        .post("/register")
        .send({
          first_name: 'Uzumaki',
          last_name: '',
          email: 'naruto@mail.com',
          password: 'naruto123',
          role: 'customer'
        })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("Last Name is required")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })

    it(`should return status 500 with object "Email is required"`, function (done) {
      chai
        .request(app)
        .post("/register")
        .send({
          first_name: 'Uzumaki',
          last_name: 'Naruto',
          email: '',
          password: 'naruto123',
          role: 'customer'
        })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("Email is required")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })

    it(`should return status 500 with object "Password is required"`, function (done) {
      chai
        .request(app)
        .post("/register")
        .send({
          first_name: 'Uzumaki',
          last_name: 'Naruto',
          email: 'naruto@mail.com',
          password: '',
          role: 'customer'
        })
        .then(res => {
          expect(res).to.have.status(500)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.include("Password is required")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  describe("POST /login", () => {
    it("should return status code 200 with response token and payload", done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "naruto@mail.com", password: "naruto123" })
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("token")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })

    it(`should send response message with 400 status code "Wrong Email/Password"`, done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "naruto@mail.com", password: "naruto" })
        .then(res => {
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("Wrong Email/Password")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })

    it(`should send response message with 400 status code "Wrong Email/Password"`, done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "", password: "naruto123" })
        .then(res => {
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("Wrong Email/Password")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })

    it(`should send response message with 400 status code "Wrong Email/Password"`, done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "naruto@mail.com", password: "" })
        .then(res => {
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("Wrong Email/Password")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })

    it(`should send response message with 400 status code "Wrong Email/Password"`, done => {
      chai
        .request(app)
        .post("/login")
        .send({ name: "naruto@mail.com", password: "naruto123" })
        .then(res => {
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("Wrong Email/Password")
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
})