const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/modelUser')

const app = require('../app')

chai.use(chaiHttp)

const expect = chai.expect
const should = chai.should

describe("CRUD User", function () {
    describe("register", function () {
        beforeEach(function (done) {
            User.deleteMany()
                .then(() => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        afterEach(function (done) {
            User.deleteMany()
                .then(() => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        it.only("it should return an object with status code 201", function (done) {
            chai
                .request(app)
                .post('/user/register')
                .send({ firstName: "Daiki", lastName: "Aomine", email: "aomine@mail.com", password: "secret", role: "Admin" })
                .then(function (res) {
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('userRegistered');
                    expect(res.body).to.have.property('token');
                    expect(res.body.userRegistered).to.have.property("firstName")
                    expect(res.body.userRegistered).to.have.property("lastName")
                    expect(res.body.userRegistered).to.have.property("email")
                    expect(res.body.userRegistered).to.have.property("password")
                    expect(res.body.userRegistered.firstName).to.equal("Daiki")
                    expect(res.body.userRegistered.lastName).to.equal("Aomine")
                    expect(res.body.userRegistered.email).to.equal("aomine@mail.com")
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
})