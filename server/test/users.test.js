const { describe, after, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const deleteAllUsers = require('../helpers/deleteAllUsers');

chai.use(chaiHttp);

const { expect } = chai;

after(done => deleteAllUsers(done));

describe('TEST USER', function() {
  describe('REGISTER USER', function() {
    it('PERFECT WORLD', function(done) {
      chai
        .request(app)
        .post('/users/register')
        .send({ email: 'mark@email.com', password: '12345' })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal(
            'User has been successfully created!'
          );
          expect(res.body).to.have.property('token');

          done();
        })
        .catch(err => done(err));
    });

    it('REGISTER EMAIL YANG SAMA', function(done) {
      chai
        .request(app)
        .post('/users/register')
        .send({ email: 'mark@email.com', password: '12345' })
        .then(res => {
          expect(res).to.have.status(406);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('Email is already registered!');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('SIGN IN USER', function() {
    it('PERFECT WORLD', function(done) {
      chai
        .request(app)
        .post('/users/signin')
        .send({ email: 'mark@email.com', password: '12345' })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('User has found!');
          done();
        })
        .catch(err => done(err));
    });

    it('EMAIL SALAH', function(done) {
      chai
        .request(app)
        .post('/users/signin')
        .send({ email: 'antoni@email.com', password: '12345' })
        .then(res => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('Email or password is invalid!');
          done();
        })
        .catch(err => done(err));
    });
    it('PASSWORD SALAH', function(done) {
      chai
        .request(app)
        .post('/users/signin')
        .send({ email: 'mark@email.com', password: '00000' })
        .then(res => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('Email or password is invalid!');
          done();
        })
        .catch(err => done(err));
    });

    it('EMAIL DAN PASSWORD SALAH', function(done) {
      chai
        .request(app)
        .post('/users/signin')
        .send({ email: 'antoni@email.com', password: '00000' })
        .then(res => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('Email or password is invalid!');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('GET CURRENT USER PROFILE', function() {
    const userToken = [];

    it('USER SIGN IN', function(done) {
      chai
        .request(app)
        .post('/users/signin')
        .send({ email: 'mark@email.com', password: '12345' })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.equal('User has found!');
          expect(res.body).to.have.property('token');
          userToken.push(res.body.token);
          done();
        })
        .catch(err => done(err));
    });

    it('PERFECT WORLD', function(done) {
      chai
        .request(app)
        .get('/users/get-curr-user-profile')
        .set('token', userToken[0])
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body.message).to.be.equal('Fetch user profile SUCCESS!');

          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('username');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('avatar');

          expect(res.body.data.username).to.be.a('string');
          expect(res.body.data.email).to.be.a('string');
          expect(res.body.data.avatar).to.be.a('string');

          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
