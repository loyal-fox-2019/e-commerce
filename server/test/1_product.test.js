const chai = require('chai');
const chaiHttp = require('chai-http')
const expect = chai.expect;
const App = require('../app')
const Product = require('../models/Product')

chai.use(chaiHttp)
after(function (done) {  
    chai
        .request(App)
        .delete('/products/'+global.productId)
        .then(res => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.include({"ok": 1})  
            console.log('deleted product')
            done()
        })
        .catch(err => {
            console.log(err)
        })
})

describe(`Product CRUD`, function () {  
    
    describe('POST /products', function () {  
        it.only('should send object with status code 201', function (done) {  
            chai
                .request(App)
                .post('/products')
                .send({
                    name: 'Kaos oblong',
                    stock: 10,
                    price: 20000
                })
                .then(response => {
                    expect(response.body).to.be.an('object')
                    expect(response.body).to.include({ name: 'Kaos oblong', stock: 10, price: 20000 })
                    expect(response).to.have.status(201)
                    global.productId = response.body._id
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe(`GET /products`, function () {  
        it.only('should send an array with 200 status code', function (done) {  
            chai
                .request(App)
                .get('/products')
                .then(response => {
                    expect(response.body).to.be.an('array')
                    expect(response).to.have.status(200)
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe('PUT /products/:id', function () {  
        it.only('should send an object with status 200 code', function (done) {  
            chai
                .request(App)
                .put('/products/'+ global.productId)
                .send({
                    name: 'Kaos oblong1',
                    stock: 11,
                    price: 10000
                })
                .then(res => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.include({ name: 'Kaos oblong1', stock: 11, price: 10000 })
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
})
