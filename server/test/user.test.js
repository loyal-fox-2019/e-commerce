const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const Product = require('../models/product')

const app = require('../app')

chai.use(chaiHttp)

const expect = chai.expect


describe('USERS ROUTE TESTING', function(){
    let productId
    let token
    let cart
    let cartToDelete
    let userId
    let toDelete
    let fakeProductId = '5e2d67b009995621367daf4a'
    before(function(done){
        let userData
        User.deleteMany({})
        .then(done=>{
            console.log("User cleared");
            return Product.deleteMany({})
        })
        .then(deleted=>{
            console.log("Product cleared");
            return User.create({
                name: 'dummy',
                email: 'dummy@mail.com',
                password: 'dummypassword'
            })
        })
        .then(dummyUser=>{
            userData = dummyUser
            return Product.create({
                name: "Mizuno",
                description: "glove",
                price: 300000,
                picture: "mizuno.jpg",
                stock: 200,
                userOwner: dummyUser._id
            })
        })
        .then(createdProduct=>{
            objProduct = createdProduct
            productId = createdProduct._id
            return Product.create({
                name: 'toDelete',
                description: 'delete',
                price: 10000,
                picture: 'delete.jpg',
                stock: 100,
                userOwner: userData._id
            })
        })
        .then(toDeleteProduct=>{
            toDelete = toDeleteProduct
            done()
        })
        .catch(err=>{
            console.log(err);
        })
    })

    after(function(done){
        User.deleteMany({})
        .then(done=>{
            console.log("User cleared");
            return Product.deleteMany({})
        })
        .then(deleted=>{
            console.log("Product cleared");
            done()
        })
        .catch(err=>{
            console.log(err);
        })
    })

    describe('POST /users/register', function(){
        it('should return object with token, userId, username with status code 201', function(done){
            const registerData = {
                name: 'test',
                email: 'test@mail.com',
                password: 'testpassword'
            }
            chai.request(app)
            .post('/users/register')
            .send(registerData)
            .then(function(res){
                
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('username')
                expect(res.body.username).to.equal('test')

                userId = res.body.userId
                token = res.body.token
                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
    })

    describe('POST /users/login', function(){
        it('should return object with token, userId, username with status code 200', function(done){
            const loginData = {
                email: 'test@mail.com',
                password: 'testpassword'
            }
            chai.request(app)
            .post('/users/login')
            .send(loginData)
            .then(function(res){

                token = res.body.token
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('username')
                expect(res.body.username).to.equal('test')
                
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
                expect(res.body.name).to.equal('test')
                expect(res.body.email).to.equal('test@mail.com')

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
        it('should return message: Minimum purchase quantity is 1 and status 400', function(done){
            chai.request(app)
            .patch('/users/addCart')
            .set('token', token)
            .send({
                item: productId,
                quantity: 0
            })
            .then(function(res){

                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Minimum purchase quantity is 1')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
        it('should return message: Product stock not enough for your purchase quantity and status 400', function(done){
            chai.request(app)
            .patch('/users/addCart')
            .set('token', token)
            .send({
                item: productId,
                quantity: 1000
            })
            .then(function(res){

                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Product stock not enough for your purchase quantity')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
        it('should return message: Product not found and status 404', function(done){
            chai.request(app)
            .patch('/users/addCart')
            .set('token', token)
            .send({
                item: fakeProductId,
                quantity: 1
            })
            .then(function(res){

                expect(res).to.have.status(404)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Product not found')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
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
        it(`should return message: 5 of the products already exist in cart and adding 200 more exceeds product's stock and status 400`, function(done){
            chai.request(app)
            .patch('/users/addCart')
            .set('token', token)
            .send({
                item: productId,
                quantity: 200
            })
            .then(function(res){

                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal(`5 of the products already exist in cart and adding 200 more exceeds product's stock`)

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })

    describe('PATCH /users/edit-cart', function(){
        before(function(done){
            User.findById(userId).populate('cart.item')
            .then(user=>{
                cart = user.cart[0]
                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
        it('should return message: "Cart item quantity updated" and status 200', function(done){
            chai.request(app)
            .patch('/users/edit-cart')
            .set('token', token)
            .send({
                newQuantity: 10,
                cartData: cart
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
        before(function(done){
            chai.request(app)
            .patch('/users/addCart')
            .set('token', token)
            .send({
                item: toDelete._id,
                quantity: 10
            })
            .then(function(res){
                return User.findById(userId).populate('cart.item')
            })
            .then(user=>{
                cartToDelete = user.cart[1]
                done()
            })
            .catch(err=>{
                console.log(err);
            })
        })
        it('should return message: "[item.name]" removed from cart', function(done){
            chai.request(app)
            .patch('/users/remove-item')
            .set('token', token)
            .send({
                cartData: cartToDelete
            })
            .then(function(res){

                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('toDelete removed from cart')

                done()
            })
            .catch(err=>{
                console.log(err);      
            })
        })
    })

    describe('PATCH /users/checkout', function(){
        it('should return message: Checkout success', function(done){
            chai.request(app)
            .patch('/users/checkout')
            .set('token', token)
            .send({
                cart: [cart]
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