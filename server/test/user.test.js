const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/user')

const app = require('../app')

chai.use(chaiHttp)

const expect = chai.expect

// before(function(){
//     User.deleteMany({})
//     .then(function(){
//         console.log('Users collection cleared')
//     })
//     .catch(function(err){
//         console.log(err);
//     })
// })

// after(function(){
//     User.deleteMany({})
//     .then(function(){
//         console.log('Users collection cleared')
//     })
//     .catch(function(err){
//         console.log(err);
//     })
// })

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTJkNWViNzVkNzIyYjFjMGM5OWQyMzEiLCJuYW1lIjoidGVzIiwiZW1haWwiOiJ0ZXNAbWFpbC5jb20iLCJpYXQiOjE1ODAwMzE5NTd9.d6Ry9EJCgynNq3n1HHXOZFjkfynkriuAVVm2aMk9VE8'
let userId = '5e2d5eb75d722b1c0c99d231'
let productId = '5e2d6194a906fc1da66e6727'

describe('USERS ROUTE TESTING', function(){
    describe('POST /users/register', function(){
        it('should return token with status code 201', function(done){
            chai.request(app)
            .post('/users/register')
            .send({
                name: "tes",
                email: "tes@mail.com",
                password: "secret",
            })
            .then(function(res){
    
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('username')
                expect(res.body.username).to.equal('tes')

                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })

    describe('POST /users/login', function(){
        it('should return token with status code 200', function(done){
            chai.request(app)
            .post('/users/login')
            .send({
                email: "tes@mail.com",
                password: "secret"
            })
            .then(function(res){
                
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('username')
                expect(res.body.username).to.equal('tes')
                
                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })

    describe('GET /users', function(){
        it('should return logged in user detail except password and status 200', function(done){
            chai.request(app)
            .get('/users')
            .set('token', token)
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('profpic')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('cart')
                expect(res.body).to.not.have.property('password')
                expect(res.body.cart).to.be.an('array')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })

    describe('PATCH /users/profpic', function(){
        it('should return logged in user detail before updated except password and status 200', function(done){
            chai.request(app)
            .patch('/users/profpic')
            .set('token', token)
            .send({
                profpic: 'updatepic.jpg'
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('profpic')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('cart')
                expect(res.body).to.not.have.property('password')
                expect(res.body.cart).to.be.an('array')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })

    describe('PATCH /users/addCart', function(){
        it('should return message: "Item added to cart successfully" and status 200', function(done){
            chai.request(app)
            .patch('/users/addCart')
            .set('token', token)
            .send({
                item: productId,
                quantity: 5
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Item added to cart successfully')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })

    describe('PATCH /users/edit-cart', function(){
        it('should return message: "Cart item quantity updated" and status 200', function(done){
            chai.request(app)
            .patch('/users/edit-cart')
            .set('token', token)
            .send({
                newQuantity: 10,
                cartData: {
                    _id: '5e2d6b9b8d7b99239a267162',
                    item: {
                      _id: '5e2d6194a906fc1da66e6727',
                      name: 'Mizuno',
                      description: 'glove',
                      price: 300000,
                      picture: 'mizuno.jpg',
                      stock: 200,
                      userOwner: '5e2d5eb75d722b1c0c99d231',
                      created_at: '2020-01-26T09:53:24.086Z',
                      updatedAt: '2020-01-26T09:53:24.086Z',
                      __v: 0
                    },
                    quantity: 5
                }
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Cart item quantity updated')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })

    describe('PATCH /users/remove-item', function(){
        it('should return message: "[item.name]" removed from cart', function(done){
            chai.request(app)
            .patch('/users/remove-item')
            .set('token', token)
            .send({
                cartData: {
                    _id: '5e2d6b9b8d7b99239a267162',
                    item: {
                      _id: '5e2d6194a906fc1da66e6727',
                      name: 'Mizuno',
                      description: 'glove',
                      price: 300000,
                      picture: 'mizuno.jpg',
                      stock: 200,
                      userOwner: '5e2d5eb75d722b1c0c99d231',
                      created_at: '2020-01-26T09:53:24.086Z',
                      updatedAt: '2020-01-26T09:53:24.086Z',
                      __v: 0
                    },
                    quantity: 5
                }
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Mizuno removed from cart')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })

    describe('PATCH /users/checkout', function(){
        it.only('should return message: Checkout success', function(done){
            chai.request(app)
            .patch('/users/checkout')
            .set('token', token)
            .send({
                cart: [
                    {
                      _id: '5e2d6d5e0b53d3252d2ba802',
                      item: {
                        _id: '5e2d6194a906fc1da66e6727',
                        name: 'Mizuno',
                        description: 'glove',
                        price: 300000,
                        picture: 'mizuno.jpg',
                        stock: 200,
                        userOwner: '5e2d5eb75d722b1c0c99d231',
                        created_at: '2020-01-26T09:53:24.086Z',
                        updatedAt: '2020-01-26T09:53:24.086Z',
                        __v: 0
                      },
                      quantity: 10
                    }
                ]
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Checkout success')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })
})