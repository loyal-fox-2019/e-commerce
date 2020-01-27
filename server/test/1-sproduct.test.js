const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
const chaiHttap = require('chai-http')
const app = require('../app')
const { createProduct, deleteProduct, createUser, deleteUser } = require('./testHelper')
const { genToken } = require('../helpers/jwt')

chai.use(chaiHttap)
// const chai.request(app) = chai.request(app)

describe('Products test => /products', async function () {

    after(async function () {
        // console.log('delete');
        await deleteUser()
    })

    let dataProduct = {
        name: 'Batu',
        image: 'asd',
        price: 12000,
        description: 'Mencoba coba',
        stock: 3,
        weigth: 1
    }

    let fake = {
        name: 'puput',
        email: 'puput@mail.com',
        password: 'adaenam',
        phone: '123456789123'
    }
    let token, user;
    before(async function () {
        user = await createUser(fake)
        console.log({id : user._id});
        token = genToken( {id : user._id})
    })

    describe.only('POST /products', async function () {

        it('should create new product', function (done) {
            console.log(token)
            let dataku = dataProduct
            chai.request(app).post('/products')
                .send(dataku)
                .set('token', token)
                .end(function (err, res) {
                    // console.log(err, 'ini err')
                    // console.log(res, 'ini res');
                    // console.log(res.body, 'ini dari res body di testingproduct');
                    expect(err).to.be.equal(null)
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('name')
                        .and.to.be.a('string')
                        .and.to.be.equal('Batu')
                    expect(res.body).to.have.property('image')
                        .and.to.be.a('string')
                        .and.to.be.equal('asd')
                    expect(res.body).to.have.property('price')
                        .and.to.be.a('number')
                        .and.to.be.equal(12000)
                    expect(res.body).to.have.property('description')
                        .and.to.be.a('string')
                        .and.to.be.equal('Mencoba coba')
                    expect(res.body).to.have.property('stock')
                        .and.to.be.a('number')
                        .and.to.be.equal(3)
                    expect(res.body).to.have.property('weight')
                        .and.to.be.a('number')
                        .and.to.be.equal(1)
                    done()
                })
        })
    })

})