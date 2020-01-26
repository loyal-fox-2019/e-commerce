const chai = require('chai');
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp);
const expect = chai.expect


describe('testing signup and signin  on router /users/', function() {
    describe('testing signup user', function() {
        it('should return status 201 and {first_name, lastname, email, password, admin, addresss}', function(done) {
            chai.request(app)
            .post('/users/signup')
            .send({first_name:'Riko', last_name: 'Orlando', email: 'rikoorlandsso123@gmail.com', password: 'rikoorlando', address: 'bogor'})
            .then(function(res){
              expect(res).to.have.status(201)
              expect(res.body).to.have.property('token')
              done()
            })
        });
    })

    describe('testing signin user', function() {
        it('should return status 200 and {token}', function(done) {
            chai.request(app)
            .post('/users/signin')
            .send({email: 'rikoorlando@gmail.com', password: 'rikoorlando'})
            .then(function(res){
              expect(res).to.have.status(200)
              expect(res.body).to.have.property('token')
              expect(res.body).to.be.an('object');
              done()
            })
        });
    })

})