'use strict';
if (process.env.NODE_ENV === 'test') require('dotenv').config();
const { Customer } = require('../models');

const Chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = Chai.expect;

Chai.use(chaiHttp);

describe('## Customer ##', function() {
  after(async function() {
    await Customer.deleteMany({ fullname: 'testing' });
  })


  describe('POST /user/register', function() {
    it('Create new user and send token to client, status 201', async function() {
      const docs = {
        fullname: 'testing',
        email: 'user@testmail.com',
        password: 'password1234',
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);
      expect(response).to.have.status(201);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('fullname');
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('email');
      expect(response.body.fullname).to.be.a('String');
      expect(response.body.email).to.be.a('String');
      expect(response.body.fullname).to.equal(docs.fullname);
      expect(response.body.email).to.equal(docs.email);
    })
    
    it('Send error when user input duplicate email, status: 400', async function() {
      const docs = {
        fullname: 'testing',
        email: 'user@testmail.com',
        password: 'passwor3',
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);
      expect(response).to.has.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Email is already in use');
    })

    it('Send error when user password less than 8 chatacters, status: 400', async function() {
      const docs = {
        fullname: 'testing',
        email: 'lesstan8r@mail.com',
        password: '3',
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Your password should be around 8 - 12 characters');
    })

    it('Send error when user password less more than 12 chatacters, status: 400', async function() {
      const docs = {
        fullname: 'testing',
        email: 'morethan12@mail.com',
        password: '12345678901233',
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Your password should be around 8 - 12 characters');
    })

    it('Send error when all field are empty, status: 400', async function() {
      const docs = {
        fullname: null,
        email: null,
        password: null,
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Fullname cannot be blank');
      expect(response.body.errors).to.include('Email cannot be blank');
      expect(response.body.errors).to.include('Password cannot be blank');
    })

    it('Send error when fullname is empty, status: 400', async function() {
      const docs = {
        fullname: null,
        email: 'fullname@mail.com',
        password: '123456789',
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Fullname cannot be blank');
    })

    it('Send error when email is empty, status: 400', async function() {
      const docs = {
        fullname: 'testing',
        email: null,
        password: '12344562',
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Email cannot be blank');
    })

    it('Send error when password is empty, status: 400', async function() {
      const docs = {
        fullname: 'testing',
        email: 'emailempty@mail.com',
        password: null,
      };
      const response = await Chai
        .request(app)
        .post('/user/register')
        .send(docs);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.has.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Password cannot be blank');
    })

  })


  describe('POST /user (login)', function() {

    it('Should send token, email, and fullname to client when login is success, status: 200', async function() {
      const docs = {
        email: 'user@testmail.com',
        password: 'password1234',
      };
      const response = await Chai
        .request(app)
        .post('/user')
        .send(docs);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('fullname');
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('email');
      expect(response.body.fullname).to.be.a('String');
      expect(response.body.email).to.be.a('String');
      expect(response.body.email).to.equal(docs.email);
    })

    it('Send error when password is wrong, status: 400', async function() {
      const docs = {
        fullname: 'user testing',
        email: 'user@testmail.com',
        password: 'sds34',
      };
      const response = await Chai
        .request(app)
        .post('/user')
        .send(docs);
      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Email or password is wrong');
    })

    it('Send error when email is wrong, status: 400', async function() {
      const docs = {
        fullname: 'user testing',
        email: 'user@il.com',
        password: 'password1234',
      };
      const response = await Chai
        .request(app)
        .post('/user')
        .send(docs);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an('Object');
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.be.an('Array');
      expect(response.body.errors).to.include('Email or password is wrong');
    })
  })


})
