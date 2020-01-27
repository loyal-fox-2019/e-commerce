const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp);
const expect = chai.expect

describe('testing CRUD on router /inventories', function() {
  describe('method POST', function() {
    it('should return status 201 and {name, stock, description, category, image file}', function(done) {
      chai.request(app)
      .post('/inventories')
      .send({name:'sepatu', stock: 10, category: 'Fashion', description: 'ini merupakan sepatu untuk kegiatan olahraga', image: 'tess', price: 100000})
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
      .then(function(res){
        expect(res).to.have.status(201)
        expect(res.body).to.have.property('name')
        expect(res.body).to.have.property('category')
        expect(res.body).to.have.property('stock')
        expect(res.body).to.have.property('description')
        expect(res.body).to.have.property('image')
        expect(res.body).to.have.property('price')
        done()
      })
    });
  });

  describe('method POST Error', function() {
    it.only('should return status 400', function(done) {
      chai.request(app)
      .post('/inventories')
      .send({name:'sepatu', stock: 10, category: 'Fashion'})
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
      .then(function(res){
        expect(res).to.have.status(400)
        done()
      })
    });
  });

  describe('method GET', function(){
    it('should return status 200 and [ array of object ]', function(done) {
      chai.request(app)
      .get('/inventories/guitar')
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        done()
      })
    });
  });

  describe('method DELETE', function(){
    it('should return status 200 and {message: success delete a inventory}', function(done) {
      chai.request(app)
      .delete('/inventories/5e254f52f5d5f333ed34f4be')
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('success delete a inventory')
        done()
      })
    });
  });

  describe('method DELETE error', function(){
    it.only('should return status 400', function(done) {
      chai.request(app)
      .delete('/inventories/5e254f52f5d5f333ed34f4be')
      .set('token','eyJhbGciOieyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
      .then(function(res){
        expect(res).to.have.status(400);
        done()
      })
    });
  });

  describe('method PUT', function(){
    it('should return status 200 and {data updated}', function(done) {
      chai.request(app)
      .put('/inventories/5e2c344d230aa966f212dd56')
      .send({name:'sepatu', stock: 5, category: 'Fashion', description: 'ini merupakan sepatu untuk kegiatan olahraga', image: 'sdsdsdsd'})
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDvjIIOPsqsKQkCU0p9RhU0zTMpkh4acyTdH0Tg')
      .then(function(res){
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('sepatu')
        expect(res.body.stock).to.equal(5)
        expect(res.body.category).to.equal('Fashion')
        expect(res.body.description).to.equal('ini merupakan sepatu untuk kegiatan olahraga')
        expect(res.body.image).to.be.equal('sdsdsdsd')
        done()
      })
    });
  })
  describe('method PUT error', function(){
    it.only('should return status 400', function(done) {
      chai.request(app)
      .put('/inventories/5e2c344d230aa966f212dd56')
      .send({name:'sepatu', stock: 5, category: 'Fashion', description: 'ini merupakan sepatu untuk kegiatan olahraga', image: 'sdsdsdsd'})
      .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZTI3MmQzNzJjNjIzNDI1NWFhNWZhNDAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgwMDEwNzYzfQ._hyNtDv')
      .then(function(res){
        expect(res).to.have.status(400);
        done()
      })
    });
  })
});