const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const Item = require('../models/Item')



chai.use(chaiHttp)

//must be admin token 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJhZG1pbiIsIl9pZCI6IjVlMjgyZDMzNTZmNGE1NGUzMGQ5MjBmMiIsIm5hbWUiOiJhZG1pbjIiLCJlbWFpbCI6ImFkbWluMkBtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDg5NjA5MDkwOTAiLCJwYXNzd29yZCI6IiQyYSQxMCRlZFF4VFJHWGt3c0JKUk9LQVpMalF1ZWZVR09qbkdILm9rbmVyZFI1dUowcVRZUUtmc3dMVyIsImNhcnQiOltdLCJjcmVhdGVkQXQiOiIyMDIwLTAxLTIyVDExOjA4OjM1LjkxOVoiLCJ1cGRhdGVkQXQiOiIyMDIwLTAxLTIyVDExOjA4OjM1LjkxOVoiLCJfX3YiOjB9LCJpYXQiOjE1Nzk2OTQ1Mjl9.9txGF24XgSkMJqkQmF7ra3BApCX9Ai8MfdzdPRjnQAs'

describe('Test Item Router',function(){
    before(function(){
        Item.deleteMany({name : 'test'},function(err,data){
            if (err) {
                console.log(err)
              } else {
                console.log('delete succsess');
              }
        })
    })
    describe('Test POST /items route', function() {
        it('should return created items and status code 201', function(done) {
            chai.request(app)
                .post('/items')
                .send({
                    name: 'test',
                    price: 100000,
                    stock: 10,
                    image: 'imageTest',
                    info: 'test info'
                })
                .set('token',token)
                .then(function(res) {
                    
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('name').equal(res.body.name)
                    expect(res.body).to.have.property('price').equal(res.body.price)
                    expect(res.body).to.have.property('stock').equal(res.body.stock)
                    expect(res.body).to.have.property('image').equal(res.body.image)
                    expect(res.body).to.have.property('info').equal(res.body.info)
                    done()
                })
                .catch(done)
            })
    })
    describe('Test validation name',function(){
        it('should return status 400 when object name is empty', function(done){
            chai.request(app)
                .post('/items')
                .send({
                    name: '',
                    price: 100000,
                    stock: 10,
                    image: 'imageTest',
                    info: 'test info'
                })
                .set('token', token)
                .then(function(res){
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message[0]).to.equal('you must enter your name')
                    done()
                })
                .catch(done)
        })
    })
})
