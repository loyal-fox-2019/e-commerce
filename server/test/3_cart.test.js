const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const App = require('../app')
let idCart;
chai.use(chaiHttp)

describe('Cart CRUD', function () {  
    describe('POST /carts', function () {  
        it.only('should send an object with status code 201', function (done) {  
            chai
            .request(App)
            .post('/carts')
            .set('token', global.token)
            .send({
                product: global.productId,
                amount: 1
            })
            .then(res => {
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('product')
                expect(res.body).to.have.property('customer')
                expect(res.body).to.have.property('amount')
                idCart = res.body._id
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })

    describe('DELETE /carts/:id', function () {  
        it.only('should send an object with status code 200', function (done) {  
            chai
            .request(App)
            .delete('/carts/'+idCart)
            .set('token', global.token)
            .then(res => {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.include({"ok": 1})
                done()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
})