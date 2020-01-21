const chai = require('chai')
const chaiHttp = require('chai-http')
const Product = require('../models/products')
const app = require('../routes/productsRoutes')
chai.use(chaiHttp)
const expect = chai.expect


describe("Product's CRUD", function(){
    describe("GET /products", function(){
        it.only('should send an array with status code 200',function(done){
            chai
                .request(app)
                .get('/products')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI1NmFiODUwZjgzMTVhZjU3YmVmMWYiLCJ1c2VybmFtZSI6InNlcmFmaW0iLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk1MTA0NTZ9.9zw1iEWEPCy48OB-GYnCbgUZ1geIfOm3-5HCvY_sR9U')
                .then(function(res){
                    expect(res).to.have.status(200)
                    // console.log(res.body)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.have.property('_id')
                    expect(res.body[0]).to.have.property('name')
                    expect(res.body[0]).to.have.property('description')
                    expect(res.body[0]).to.have.property('picture')
                    expect(res.body[0]).to.have.property('price')
                    expect(res.body[0]).to.have.property('createdAt')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    describe('POST /products', function(){
        it.only('should return an object with status code 201', function(done){
            chai
                .request(app)
                .post('/products')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI1NmFiODUwZjgzMTVhZjU3YmVmMWYiLCJ1c2VybmFtZSI6InNlcmFmaW0iLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk1MTA0NTZ9.9zw1iEWEPCy48OB-GYnCbgUZ1geIfOm3-5HCvY_sR9U')
                .send({
                    name: 'handphone',
                    description: 'very good',
                    picture: '/Home/Pictwendy.jpeg',
                    price: 15000,
                    stock: 15
                })
                .then(function(res){
                    console.log(res.body.picture)
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('picture')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('seller')
                    expect(res.body.name).to.equal('handphone')
                    expect(res.body.description).to.equal('very good')
                    expect(res.body.picture).to.not.equal('wendy.jpeg')
                    expect(res.body.price).to.equal(15000)
                    expect(res.body.stock).to.equal(15)
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
        it.only('should return an error with status code 400', function(done){
            chai
                .request(app)
                .post('/products')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI1NmFiODUwZjgzMTVhZjU3YmVmMWYiLCJ1c2VybmFtZSI6InNlcmFmaW0iLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk1MTA0NTZ9.9zw1iEWEPCy48OB-GYnCbgUZ1geIfOm3-5HCvY_sR9U')
                .send({
                    name: '',
                    description: '',
                    picture: '',
                    price: null
                })
                .then(res=>{
                    expect(res).to.have.status(400)
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
                
        })
    })
    describe('GET /products/:id', function(){
        it.only('should get status code 200 and a product with _id: 5e25688657d10f58d3fb4e66', function(done){
            chai
                .request(app)
                .get('/products/5e25688657d10f58d3fb4e66')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI1NmFiODUwZjgzMTVhZjU3YmVmMWYiLCJ1c2VybmFtZSI6InNlcmFmaW0iLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk1MTA0NTZ9.9zw1iEWEPCy48OB-GYnCbgUZ1geIfOm3-5HCvY_sR9U')
                .then(res=>{
                    // console.log(res.body, 'ini chai latte')
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body._id).to.equal('5e25688657d10f58d3fb4e66')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('picture')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('stock')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    describe('DELETE /products/:id', function(){
        it('should get status 200 and deleted product info', function(done){
            chai
                .request(app)
                .delete('/products/5e25687db2c99f58b8866092')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI1NmFiODUwZjgzMTVhZjU3YmVmMWYiLCJ1c2VybmFtZSI6InNlcmFmaW0iLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk1MTA0NTZ9.9zw1iEWEPCy48OB-GYnCbgUZ1geIfOm3-5HCvY_sR9U')
                .then(res=>{
                    expect(res).to.have.status(200)
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
    describe('PATCH /products/:id', function(){
        it('should get status 200 and updated product', function(done){
            chai
                .request(app)
                .patch('/products/5e25688657d10f58d3fb4e66')
                .send({
                    name: 'hape',
                    description: 'bagus',
                    picture: 'img.jpg',
                    price: 15000,
                    stock: 15
                })
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI1NmFiODUwZjgzMTVhZjU3YmVmMWYiLCJ1c2VybmFtZSI6InNlcmFmaW0iLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk1MTA0NTZ9.9zw1iEWEPCy48OB-GYnCbgUZ1geIfOm3-5HCvY_sR9U')
                .then(res=>{
                    // console.log(res)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('picture')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
})

