const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

describe('/login', function() {
  before(async function() {
    const newUser = await User.create({
      username: 'test',
      email: 'test@email.com',
      password: 'asdfasdf',
    })
  })

  after(async function() {
    await User.deleteMany({})
  })

  describe('POST /login', function() {
    it('should send token - (code: 200)', async function() {
      const data = {
        email: 'test@email.com',
        password: 'asdfasdf',
      }
      const username = 'test'

      const response = await chai
        .request(app)
        .post('/login')
        .send(data)

      expect(response).to.have.status(200)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('token')
      expect(response.body).to.have.property('username')
      expect(response.body.username).to.equal(username)
    })

    it('should send errors - (Email or password is wrong, code: 400)', async function() {
      const data = {}
      const response = await chai
        .request(app)
        .post('/login')
        .send(data)

      expect(response).to.have.status(400)
      expect(response.body).to.be.an('object')
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.equal('Email or password is wrong')
    })
  })
})
