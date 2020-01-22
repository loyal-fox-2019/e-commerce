const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai

const {clearUsers} = require('./helpers')
const app = require('../app')

chai.use(chaiHttp)

const newUserData = {
   email: "user1@mail.com",
   password: "asd123"
}

describe('/user', function() {
   after(async function() {
      await clearUsers()
   })

   describe('POST /register', function() {
      it('should return an object with keys: "token" and "userId" - status 201', async function() {
         const registerResponse = await chai.request(app)
            .post('/register')
            .send(newUserData)

         expect(registerResponse).to.have.status(201)

         expect(registerResponse.body).to.have.property('token')
         expect(registerResponse.body.token).to.be.a('string')

         expect(registerResponse.body).to.have.property('userId')
         expect(registerResponse.body.userId).to.be.a('string')
      })
   })

   describe('POST /register - make duplicate error', function() {
      it('should return an object with keys: "message" - status 400', async function() {
         const registerResponse = await chai.request(app)
            .post('/register')
            .send(newUserData)
         
         expect(registerResponse).to.have.status(400)

         expect(registerResponse.body).to.have.property('message')
         expect(registerResponse.body.message).to.be.an('array')
         expect(registerResponse.body.message[0]).to.equal(`${newUserData.email} has been registered in our server.`)
      })
   })

   describe('POST /login', function() {
      it('should return an object with keys: "token" and "userId" - status 200', async function() {
         const loginResponse = await chai.request(app)
            .post('/login')
            .send(newUserData)

         
         expect(loginResponse).to.have.status(200)

         expect(loginResponse.body).to.have.property('token')
         expect(loginResponse.body.token).to.be.a('string')
         
         expect(loginResponse.body).to.have.property('userId')
         expect(loginResponse.body.userId).to.be.a('string')
      })
   })

   describe('POST /createAdmin', function() {
      it('should return an object with keys: "token" - status 201', async function() {
         const createAdminResponse = await chai.request(app)
            .post('/createAdmin')

         expect(createAdminResponse).to.have.status(201)
         expect(createAdminResponse.body).to.have.property('token')
         expect(createAdminResponse.body.token).to.be.a('string')
      })
   })
})