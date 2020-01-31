const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const { deleteUsers } = require('../helpers/testHelpers')

chai.use(chaiHttp);

describe('/users', function() {
  
  let id;
  let access_token;

  before(function() {
    deleteUsers();
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
          id = res.body._id
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
              "access_token",
              "image"
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
            expect(res.body).to.have.property("error")
            expect(res.body.error).to.be.an("array");
            expect(res.body.error).to.include("Name is required");
            expect(res.body.error).to.include("john@ is not a valid email format!");
            expect(res.body.error).to.include("Please insert minimum 8 character for password");
          }
        });
        done();
    });

  })

  describe('POST /signin', function() {

    it('should return an object with access_token and name', done => {
      const data = {
        email: 'john@mail.com',
        password: '12345678'
      }
      chai
        .request(app)
        .post('/users/signin')
        .send(data)
        .end((err, res) => {
          access_token = res.body.access_token
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.keys([
              "_id",
              "name",
              "email",
              "isAdmin",
              "access_token",
              "image"
            ]);
            expect(res.body.email).to.equal(data.email)
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
            expect(res.body.error).to.equal("Incorrect email/password");
          }
        });
        done();
    })
  })

  describe('GET /:id', function() {

    it('should return an user object with populated products array', done => {
      chai
        .request(app)
        .get(`/users/${id}`)
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.keys([
              "_id",
              "name",
              "email",
              "image",
              "products"
            ]);
            expect(res.body.products).to.be.an('array')
            expect(res.body._id).to.equal(id)
          }
        })
        done()
    })

    it('should return error with status code 400', done => {
      chai
        .request(app)
        .get(`/users/${id}`)
        .set('access_token', '12386gd169dg7isodf')
        .end((err, res) => {
          console.log(res.body)
          if (err) {
            done(err)
          } else {
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error')
            expect(res.body.error).to.equal('Please login first, you are not logged in yet!')
          }
        })
        done()
    })

  })

})