const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const Product = require('../models/products')
chai.use(chaiHttp)
const expect = chai.expect
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMzOTYzZDY5Y2U5NjE2YzU4Zjc0ZmIiLCJlbWFpbCI6IjEyM0BtYWlsLmNvbSIsImlhdCI6MTU4MDQzOTEwMX0.jopyUcw_jrFrjcR6Ow3lJsDp9pCcLOBJU8iKmebyPaA'
const userId = '5e33963d69ce9616c58f74fb'
var productId=null
var cartId=null

before(function(){
    return Product.create({
        name: 'laptop',
        description: 'keren',
        price: 100000,
        picture: 'img.jpg',
        stock: 20,
        UserId: userId
    })
    .then(result=>{
        productId = result._id
        console.log(result, 'hasil before create')
    })
    .catch(err=>{
        console.log(err)
    })
})


describe("Cart's Create and Delete", function(){
    describe("POST /cart/:productId", function(){
        it.only('should send an object with status code 200',function(done){
            chai
                    .request(app)
                    .post(`/cart/${productId}`)
                    .set('token', token)
                    .send({
                        UserId: userId,
                        Quantity: 6,
                        isCheckOut: false
                    })
            .then(function(res){
                // console.log(res)
                cartId = res.body._id
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('UserId')
                expect(res.body).to.have.property('productId')
                expect(res.body).to.have.property('Quantity')
                expect(res.body).to.have.property('isCheckOut')
                done()
            })
            .catch(err=>{
                console.log(err)
            })
        
        })
    })
    describe("GET /cart", function(){
        it.only('should send an object with status code 200',function(done){
            chai
                .request(app)
                .get('/cart')
                .set('token', token)
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.have.property('UserId')
                    expect(res.body[0]).to.have.property('productId')
                    expect(res.body[0]).to.have.property('Quantity')
                    expect(res.body[0]).to.have.property('isCheckOut')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        
        })
    })
    describe("GET /cart/history", function(){
        it.only('should send an object with status code 200',function(done){
            chai
                .request(app)
                .get('/cart')
                .set('token', token)
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.have.property('UserId')
                    expect(res.body[0]).to.have.property('productId')
                    expect(res.body[0]).to.have.property('Quantity')
                    expect(res.body[0]).to.have.property('isCheckOut')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        
        })
    })
    describe("PATCH /cart", function(){
        // req.body.cartList.forEach(
        it('should send an object with status code 200',function(done){
            chai
                .request(app)
                .patch('/cart')
                .set('token', token)
                .send({
                    cartList: [
                        {
                            _id: '5e339f6b80b1021c56ff1b2e',
                            UserId: '5e33963d69ce9616c58f74fb',
                            productId: '5e339f6980b1021c56ff1b2b',
                            Quantity: 6,
                            isCheckOut: false
                          }
                    ]
                })
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('UserId')
                    expect(res.body).to.have.property('productId')
                    expect(res.body).to.have.property('Quantity')
                    expect(res.body).to.have.property('isCheckOut')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        
        })
    })
    describe("DELETE /cart", function(){
        it.only('should send an object with status code 200',function(done){
            chai
                .request(app)
                .delete('/cart/'+ cartId)
                .set('token', token)
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        
        })
    })
})