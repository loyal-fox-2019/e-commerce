const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const { deleteUsers } = require('../helpers/testHelpers')

chai.use(chaiHttp);

describe.only('/users', function() {
  after(async function() {
    await deleteUsers();
  })

  describe('POST /register', function() {

    it('should create a new user and return user object with status code 201', done => {
      const data = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '12345678'
      };
      chai
        .request(app)
        .post("/users/register")
        .send(data)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.keys([
              "_id",
              "name",
              "email",
              "isAdmin",
              "access_token"
            ]);
            expect(res.body.name).to.equal(data.name);
            expect(res.body.email).to.equal(data.email);
          }
        });
        done();
    });

    it('should return error with status code 400', done => {
      const data = {
        name: '',
        email: 'john@',
        password: '123456'
      };
      chai
        .request(app)
        .post("/users/register")
        .send(data)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("errors")
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors).to.include("Name is required");
            expect(res.body.errors).to.include("john@ is not a valid email address");
            expect(res.body.errors).to.include("Minimum password length is 8 characters");
          }
        });
        done();
    });

  })

  describe('POST /signin', function() {

    it('should return an object with access_token and name', done => {
      const data = {
        name: 'john@mail.com',
        password: '12345678'
      }
      chai
        .request(app)
        .post('/users/signin')
        .send(data)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.keys(['access_token', 'name'])
            expect(res.body.name).to.equal(data.name)
            expect(res.body.access_token).to.have.lengthOf.gt(10)
          }
        })
        done()
    })

    it('should return error with status code 400', done => {
      const data = {
        email: 'john@mail.com',
        password: '12345679'
      };
      chai
        .request(app)
        .post("/users/signin")
        .send(data)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("error")
            expect(res.body.error).to.equal("Incorrect email/password!");
          }
        });
        done();
    })
  })

})