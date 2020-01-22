const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')

chai.use(chaiHttp)

const expect = chai.expect

describe('CRUD Product', function(){
    describe('Get /products', function(){
        it('Should send status code of 200 along with an array', function(done){
            chai
                .request(app) // require from app.js later
                .get('/products')
                .then(function (res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    })

    describe('Post /products', function(){
        it.only('Should send status code of 201 along with an object', function(done){
            chai
                .request(app) // require from app.js later
                .post('/products')
                .send({
                    productName: 'Samsung galaxy S8 Plus',
                    productImage: 'image_url',
                    description: 'This is a handphone with the model of Samsung Galaxy S8 Plus',
                    price: 3500000,
                    stock: 5,
                    category: 'electronics'
                })
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjY4ZWZjZGM5YTlkMGYxOTNmODM4MSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTc5NTg1Mjc2fQ.-ybfmGMvVbMK_vZU6WTvl2ijjdJrVm0cfiqlArrUbWk')
                .then(function (res){
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('productName')
                    expect(res.body).to.have.property('productImage')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('category')
                    expect(res.body.productName).to.equal('Samsung galaxy S8 Plus')
                    expect(res.body.productImage).to.equal('image_url')
                    expect(res.body.description).to.equal('This is a handphone with the model of Samsung Galaxy S8 Plus')
                    expect(res.body.price).to.equal(3500000)
                    expect(res.body.stock).to.equal(5)
                    expect(res.body.category).to.equal('electronics')
                    done()
                })
        })
    })

    describe('Get /products/:productId', function(){
        it('Should send status code of 200 along with an object', function(done){
            chai
                .request(app)
                .get('/products/5e25504f3d55d04faba1d931')
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('productName')
                    expect(res.body).to.have.property('productImage')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('category')
                    expect(res.body.productName).to.equal('Samsung galaxy S8 Plus')
                    expect(res.body.productImage).to.equal('image_url')
                    expect(res.body.description).to.equal('This is a handphone with the model of Samsung Galaxy S8 Plus')
                    expect(res.body.price).to.equal(3500000)
                    expect(res.body.stock).to.equal(5)
                    expect(res.body.category).to.equal('electronics')
                    done()
                })
                .catch(function (err) {
                    console.log(err);
                    
                })
        })
    })

    describe('Delete /products/:productId', function(){
        it('Should return status code of 200 along with an object', function(done){
            chai
                .request(app)
                .delete('/products/5e256312ddc671576a78b4be')
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('deletedCount')
                    expect(res.body.deletedCount).to.equal(1)
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    })

    describe('Put /products/:productId', function(){
        it('Should return status code of 200 along with an object', function(done){
            chai
                .request(app)
                .put('/products/5e256368e67f065795f407ba')
                .send({
                    productName: 'Samsung galaxy S10 Plus',
                    productImage: 'image_url_S10',
                    description: 'This is a handphone with the model of Samsung Galaxy S10 Plus',
                    price: 15000000,
                    stock: 5,
                    category: 'electronics'
                })
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('productName')
                    expect(res.body).to.have.property('productImage')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('category')
                    expect(res.body.productName).to.equal('Samsung galaxy S10 Plus')
                    expect(res.body.productImage).to.equal('image_url_S10')
                    expect(res.body.description).to.equal('This is a handphone with the model of Samsung Galaxy S10 Plus')
                    expect(res.body.price).to.equal(15000000)
                    expect(res.body.stock).to.equal(5)
                    expect(res.body.category).to.equal('electronics')
                    done()
                })
        })
    })

    describe('Patch /products/:productId', function(){
        it('should return status code of 200 and an object', function(done){
            chai
                .request(app)
                .patch('/products/5e256368e67f065795f407ba')
                .send({
                    stock: 2
                })
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('productName')
                    expect(res.body).to.have.property('productImage')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('price')
                    expect(res.body).to.have.property('stock')
                    expect(res.body).to.have.property('category')
                    expect(res.body.productName).to.equal('Samsung galaxy S10 Plus')
                    expect(res.body.productImage).to.equal('image_url_S10')
                    expect(res.body.description).to.equal('This is a handphone with the model of Samsung Galaxy S10 Plus')
                    expect(res.body.price).to.equal(15000000)
                    expect(res.body.stock).to.equal(2)
                    expect(res.body.category).to.equal('electronics')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    })
})

describe('User Create, Login', function(){
    describe('Post /users', function(){
       it('Should return status code of 201 and an object', function(done){
            chai
            .request(app)
            .post('/users')
            .send({
                name: 'Okka Linardi',
                email: 'okka@mail.com',
                password: 'okkalinardi',
                address: 'Jl. ABC no.45, Jakarta Selatan',
                admin: false
            })
            .then(function(res){
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('token')
                // console.log(res.body.token)
                done()
            })
            .catch(function(err){
                console.log(err)
            })
       })
    })

    describe('Post /users/login', function(done){
        it('Should return status code of 200 and an object', function(done){
            chai
                .request(app)
                .post('/users/login')
                .send({
                    email: 'okka@gmail.com',
                    password: 'okkalinardi'
                })
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    })
    
})

describe('Cart Route', function(){
    describe('Post /cart || generate Cart', function(){
        it('Should return a cart with logged User for userId and an empty array', function(done){
            chai
                .request(app)
                .post('/cart')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjY4MDFlMDhiZjcwMGIwYjgwOWRlMyIsImFkbWluIjp0cnVlLCJpYXQiOjE1Nzk1ODE0NzB9.ksvXp_woPlvaQLyxznrMIQ_LcrbEeMW9INAg0hlDrCg')
                .then(function(res){
                    // console.log('INI RES=====>',res)
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('userId')
                    expect(res.body).to.have.property('productList')
                    expect(res.body.productList).to.be.an('array')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    })

    describe('Delete /cart/:userId', function(){
        it('Should return status code of 200 and the message: "Successfully deleted cart" ', function(done){
            chai
                .request(app)
                .delete('/cart')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjY4MDFlMDhiZjcwMGIwYjgwOWRlMyIsImFkbWluIjp0cnVlLCJpYXQiOjE1Nzk1ODE0NzB9.ksvXp_woPlvaQLyxznrMIQ_LcrbEeMW9INAg0hlDrCg')
                .then(function(res){
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Successfully deleted cart')
                    done()
                })
                .catch(function(err){
                    console.log(err)
                })
        })
    })
})