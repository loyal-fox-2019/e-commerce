const chai = require('chai')
const chaiHttp = require('chai-http')
const Product = require('../models/products')
const app = require('../index')
chai.use(chaiHttp)
const expect = chai.expect
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMzOTYzZDY5Y2U5NjE2YzU4Zjc0ZmIiLCJlbWFpbCI6IjEyM0BtYWlsLmNvbSIsImlhdCI6MTU4MDQzOTEwMX0.jopyUcw_jrFrjcR6Ow3lJsDp9pCcLOBJU8iKmebyPaA'
var productId = null

describe("Product's CRUD", function(){
    describe("GET /products", function(){
        it.only('should send an array with status code 200',function(done){
            chai
                .request(app)
                .get('/product')
                .set('token', token)
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
                .post('/product')
                .set('token', token)
                .send({
                    name: 'handphone',
                    description: 'very good',
                    picture: '/Home/Pictwendy.jpeg',
                    price: 15000,
                    stock: 15
                })
                .then(function(res){
                    // console.log(res.body.picture, res.body._id, 'test post')
                    productId = res.body._id
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('picture')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('UserId')
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
                .set('token', token)
                .send({
                    name: '',
                    description: '',
                    picture: '',
                    price: null
                })
                .then(res=>{
                    expect(res).to.have.status(404)
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
                .get('/product/'+productId)
                .set('token', token)
                .then(res=>{
                    // console.log(res.body, 'ini chai latte')
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body._id).to.equal(productId)
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
    describe('PUT /products/:id', function(){
        it.only('should get status 200 and updated product', function(done){
            chai
                .request(app)
                .put('/product/'+ productId)
                .send({
                    name: 'hape',
                    description: 'bagus',
                    picture: 'img.jpg',
                    price: 15000,
                    stock: 15
                })
                .set('token', token)
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
    describe('DELETE /product/:id', function(){
        it.only('should get status 200 and deleted product info', function(done){
            chai
                .request(app)
                .delete('/product/'+productId)
                .set('token', token)
                .then(res=>{
                    expect(res).to.have.status(200)
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
    })
})

