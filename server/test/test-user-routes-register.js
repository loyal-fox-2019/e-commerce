const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

describe('/register', function() {
  after(async function() {
    await User.deleteMany({})
  })

  describe('POST /register', function() {
    it('should create a new member - (code: 201)', async function() {
      const data = {
        username: 'test',
        email: 'test@email.com',
        password: 'asdfasdf',
      }
      const response = await chai
        .request(app)
        .post('/register')
        .send(data)

      expect(response).to.have.status(201)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('token')
      expect(response.body).to.have.property('username')
      expect(response.body.username).to.equal(data.username)
    })

    it('should send errors - (Empty body, code: 400)', async function() {
      const data = {}
      const response = await chai
        .request(app)
        .post('/register')
        .send(data)

      expect(response).to.have.status(400)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.be.an('array')
      expect(response.body.errors).to.include('Email is required')
      expect(response.body.errors).to.include('Password is required')
      expect(response.body.errors).to.include('Username is required')
    })

    it('should send an error - (Duplicate email, code: 400)', async function() {
      const data = {
        username: 'test',
        email: 'test@email.com',
        password: 'asdfasdf',
      }
      const response = await chai
        .request(app)
        .post('/register')
        .send(data)

      expect(response).to.have.status(400)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.include('Email already registered')
    })
  })
})
