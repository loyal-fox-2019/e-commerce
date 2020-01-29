const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);

before(function (done) {
  User.deleteMany({})
    .then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
});

after(function (done) {
  User.deleteMany({})
    .then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
});

describe("User Test", function () {
  // Registration
  describe("POST /users/register", function () {
    // register
    it("success register user with status code 201 and no errors", function (done) {
      const user = {
        name: "Sulthon Abdul Malik",
        email: "sulthon.almalik@gmail.com",
        password: "asd134679"
      }
      chai
        .request(app)
        .post("/users/register")
        .send(user)
        .then((result) => {
          expect(result).to.have.status(201);
          expect(result.body).to.be.an("object");
          expect(result.body).to.have.keys(["token", "name", "imageUrl"]);
          done();
        }).catch((err) => {
          console.error(err);
        });
    });
    // register - failed
    it("should error with error code 400", function (done) {
      chai
        .request(app)
        .post("/users/register")
        .send({})
        .then((result) => {
          expect(res).to.have.status(400)
          expect(res.body).to.have.all.keys('error', 'message', "source", "statusCode");
          expect(res.body.message).to.include('validation')
          done()
        }).catch((err) => {
          console.error(err);
        });
    })
  });

  // Log
  describe("POST /users/login", function () {

  });
})