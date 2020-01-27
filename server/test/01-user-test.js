'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const expect = chai.expect

const userModel = require('../models/user')

chai.use(chaiHttp)


describe('Users CRUD Test', function () {

    after(function (done) {
        userModel.remove()
            .then(() => {
                done()
            })
            .catch(error => {
                console.log(error)
            })

    })

    describe('POST /users || Create A New User / Registration', function () {
        it('user register with correct data, should send an object with 201 status code', function (done) {
            const userRegisterData = {
                name: "Test User",
                email: "testuser@mail.com",
                password: "testpassword123"
            }
            chai.request(app)
                .post('/users')
                .send(userRegisterData)
                .then(function (res) {
                    expect(res).to.have.status(201)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('user')
                    expect(res.body).to.have.property('access_token')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('user registration success')

                    expect(res.body.user).to.be.an('object')
                    expect(res.body.user).to.have.property('name')
                    expect(res.body.user).to.have.property('email')

                    expect(res.body.user.name).to.be.an('string')
                    expect(res.body.user.email).to.be.an('string')
                    expect(res.body.access_token).to.be.an('string')

                    expect(res.body.user.name).to.equal('Test User')
                    expect(res.body.user.email).to.equal('testuser@mail.com')
                    // expect('').should.be.empty

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user register with empty name, should send an object with 400 status code', function (done) {
            const userRegisterData = {
                name: "",
                email: "testuser@mail.com",
                password: "testpassword123"
            }

            chai.request(app)
                .post('/users')
                .send(userRegisterData)
                .then(function (res) {
                    expect(res).to.have.status(400)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('name is required!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user register with empty email, should send an object with 400 status code', function (done) {
            const userRegisterData = {
                name: "Test User",
                email: "",
                password: "testpassword123"
            }

            chai.request(app)
                .post('/users')
                .send(userRegisterData)
                .then(function (res) {
                    expect(res).to.have.status(400)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('email is required!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user register with empty password, should send an object with 400 status code', function (done) {
            const userRegisterData = {
                name: "Test User",
                email: "testuser@mail.com",
                password: ""
            }

            chai.request(app)
                .post('/users')
                .send(userRegisterData)
                .then(function (res) {
                    expect(res).to.have.status(400)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('password is required!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user register with invalid email format, should send an object with 400 status code', function (done) {
            const userRegisterData = {
                name: "Test User",
                email: "invalidemailformat",
                password: "testpassword123"
            }

            chai.request(app)
                .post('/users')
                .send(userRegisterData)
                .then(function (res) {
                    expect(res).to.have.status(400)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('invalid email address format, please use a valid email!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user register with email address that already registred, should send an object with 400 status code', function (done) {
            const userRegisterData = {
                name: "Test User 2",
                email: "testuser@mail.com",
                password: "testpassword123456"
            }

            chai.request(app)
                .post('/users')
                .send(userRegisterData)
                .then(function (res) {
                    expect(res).to.have.status(400)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('email already registered with another account, please try with another email!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

    })

    describe('POST /users/login || User Login', function () {
        it('user login with correct login data, should send an object with 200 status code', function (done) {
            const userLoginData = {
                email: "testuser@mail.com",
                password: "testpassword123"
            }
            chai.request(app)
                .post('/users/login')
                .send(userLoginData)
                .then(function (res) {
                    expect(res).to.have.status(200)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')
                    expect(res.body).to.have.property('access_token')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('login success')

                    expect(res.body.access_token).to.be.an('string')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user login with wrong login data, should send an object with 401 status code', function (done) {
            const userLoginData = {
                email: "wronglogin@email.com",
                password: "wrongpassword123"
            }
            chai.request(app)
                .post('/users/login')
                .send(userLoginData)
                .then(function (res) {
                    expect(res).to.have.status(401)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('invalid email & password combination!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user login with wrong / empty email, should send an object with 401 status code', function (done) {
            const userLoginData = {
                email: "",
                password: "testpassword123"
            }
            chai.request(app)
                .post('/users/login')
                .send(userLoginData)
                .then(function (res) {
                    expect(res).to.have.status(401)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('invalid email & password combination!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })

        it('user login with wrong / empty password, should send an object with 401 status code', function (done) {
            const userLoginData = {
                email: "testuser@mail.com",
                password: ""
            }
            chai.request(app)
                .post('/users/login')
                .send(userLoginData)
                .then(function (res) {
                    expect(res).to.have.status(401)

                    expect(res.body).to.be.an('object')

                    expect(res.body).to.have.property('message')

                    expect(res.body.message).to.be.an('string')
                    expect(res.body.message).to.equal('invalid email & password combination!')

                    done()
                })
                .catch(function (err) {
                    console.log(err)
                })
        })
    })

    // describe('GET /users/profile || Get Singin User Profile Data', function () {
    //     it('get sign in user profile data using valid access_token, should send an object with 200 status code', function (done) {
    //         const access_token = 'validAccessToken'
    //         chai.request(app)
    //             .get('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(200)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')
    //                 expect(res.body).to.have.property('user')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('get user sign in profile success!')

    //                 expect(res.body.user).to.be.an('object')

    //                 expect(res.body.user).to.have.property('name')
    //                 expect(res.body.user).to.have.property('email')

    //                 expect(res.body.user.name).to.be.an('string')
    //                 expect(res.body.user.email).to.be.an('string')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('get sign in user profile data using invalid access_token, should send an object with 401 status code', function (done) {
    //         const access_token = 'falseAccessToken'
    //         chai.request(app)
    //             .get('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(401)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('invalid access token!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('get sign in user profile data with empty access_token, should send an object with 401 status code', function (done) {
    //         const access_token = 'falseAccessToken'
    //         chai.request(app)
    //             .get('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(401)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('access token must be provided!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })
    // })

    // describe('PATCH /users/profile || Update User Profile Data', function () {
    //     it('update user profile data with correct new profile data using a valid access_token, should send an object with 200 status code', function (done) {
    //         const access_token = 'validAccessToken'
    //         const updateUserProfileData = {
    //             name: 'New User Test Name',
    //             email: 'newusertest@mail.com'
    //         }
    //         chai.request(app)
    //             .patch('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(200)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')
    //                 expect(res.body).to.have.property('user')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('update user profile success!')

    //                 expect(res.body.user).to.be.an('object')

    //                 expect(res.body.user).to.have.property('name')
    //                 expect(res.body.user).to.have.property('email')

    //                 expect(res.body.user.name).to.be.an('string')
    //                 expect(res.body.user.email).to.be.an('string')

    //                 expect(res.body.user.name).to.equal('New User Test Name')
    //                 expect(res.body.user.email).to.equal('newusertest@mail.com')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('update user profile data with correct new profile data using a invalid access_token, should send an object with 401 status code', function (done) {
    //         const access_token = 'invalidAccessToken'
    //         const updateUserProfileData = {
    //             name: 'New User Test Name',
    //             email: 'newusertest@mail.com'
    //         }
    //         chai.request(app)
    //             .patch('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(401)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')
    //                 expect(res.body).to.have.property('user')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('invalid access_token!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('update user profile data with empty name using a valid access_token, should send an object with 400 status code', function (done) {
    //         const access_token = 'validAccessToken'
    //         const updateUserProfileData = {
    //             name: '',
    //             email: 'newusertest@mail.com'
    //         }
    //         chai.request(app)
    //             .patch('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(400)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('name is required!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('update user profile data with empty email using a valid access_token, should send an object with 400 status code', function (done) {
    //         const access_token = 'validAccessToken'
    //         const updateUserProfileData = {
    //             name: 'New User Test Name',
    //             email: ''
    //         }
    //         chai.request(app)
    //             .patch('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(400)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('email is required!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('update user profile data with email address that already use using a valid access_token, should send an object with 400 status code', function (done) {
    //         const access_token = 'validAccessToken'
    //         const updateUserProfileData = {
    //             name: 'New User Test Name',
    //             email: 'duplicate@mail.com'
    //         }
    //         chai.request(app)
    //             .patch('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(400)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('email already registered with another account, please try with another email!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('update user profile data with invalid email format, should send an object with 400 status code', function (done) {
    //         const userRegisterData = {
    //             name: "New User Test Name",
    //             email: "invalidemailformat"
    //         }

    //         chai.request(app)
    //             .patch('/users/profile')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(400)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('invalid email address format, please use a valid email!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })
    // })

    // describe('GET /users || Get All Users data (access_token role == admin)', function () {
    //     it('get all user data using valid access_token and role == admin, should send an object with 200 status code', function (done) {
    //         const access_token = 'adminAccessToken'
    //         chai.request(app)
    //             .get('/users')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(200)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')
    //                 expect(res.body).to.have.property('users')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('get all user success!')

    //                 expect(res.body.users).to.be.an('array')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })

    //     it('get all user data using valid access_token and role != admin, should send an object with 403 status code', function (done) {
    //         const access_token = 'userAccessToken'
    //         chai.request(app)
    //             .get('/users')
    //             .set({ access_token: access_token })
    //             .then(function (res) {
    //                 expect(res).to.have.status(403)

    //                 expect(res.body).to.be.an('object')

    //                 expect(res.body).to.have.property('message')

    //                 expect(res.body.message).to.be.an('string')
    //                 expect(res.body.message).to.equal('forbiden, only admin can see users data!')

    //                 done()
    //             })
    //             .catch(function (err) {
    //                 console.log(err)
    //             })
    //     })
    // })
})