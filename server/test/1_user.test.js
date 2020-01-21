const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const Model = require('../models/user')
chai.use(chaiHttp)

const expect = chai.expect
describe('USER CRUD', function () {
    after(function () {
        Model.deleteMany({})
            .then(success => {
                console.log('Delete Success')
            })
            .catch(err => {
                console.log(err)
            })
    })
    describe('POST /users/register', function () {
        it('should return status 201 and return an object that has property token', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    full_name: 'Angga Derawan',
                    email: 'angga@mail.com',
                    password: 'powerfullPassword'
                })
                // .end(function (err, res) {
                //     expect(res).to.have.status(201)
                //     expect(res.body).to.have.property('token')
                //     console.log("sadasda")
                //     done()
                // })
                .then(res => {
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('token')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe('POST /users/login', function () {
        it('Should return status 200 and return an object that has property token', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'angga@mail.com',
                    password: 'powerfullPassword'
                })
                .then(res => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('token')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        }
        )
    })
    describe('Login with wrong email/password', function () {
        it('Should return status 400 and return an object that has message "Email / Password Wrong"', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'angga@mail.com',
                    password: 'wrongpassword'
                })
                .then(res => {
                    expect(res).to.have.status(400)
                    // console.log(res.body.message)c
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Email / Password Wrong')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
})

// describe("test", function () {
//     it('should return status 201 and return an object that has property token', function (done) {
//         chai.request(app)
//             .post('/users/register')
//             .send({
//                 full_name: 'Angga Derawan',
//                 email: 'angga@mail.com',
//                 password: 'powerfullPassword'
//             })
//             .end(function (err, res) {
//                 expect(res).to.have.status(201)
//                 expect(res.body).to.have.property('token')
//                 console.log("sadasda")
//                 done()
//             })
//     })
//     it('Should return status 200 and return an object that has property token', function (done) {
//         console.log("peding masuk ga")
//         chai.request(app)
//             .post('/users/login')
//             .send({
//                 email: 'angga@mail.com',
//                 password: 'powerfullPassword'
//             })
//             .then(res => {
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.have.property('token')
//                 done()
//             })
//             .catch(err => {
//                 console.log(err, "masuk error")
//             })
//     })
// })