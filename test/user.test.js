const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const app = require('../routes/userRoutes')
chai.use(chaiHttp)
const expect = chai.expect

// after(function(done){
//     User.deleteMany({})
//     .then(()=>{
//         console.log('cleaned up')
//         done()
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

describe('USER Routes', function(){
    describe('POST /register', function(){
        it('should get an object with status code 201', function(done){
            chai
                .request(app)
                .post('/register')
                .send({
                    username: 'serafim',
                    email: 'sera@mail.com',
                    password: 'sera'
                })
                .then(function(res){
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('username')
                    expect(res.body).to.have.property('email')
                    expect(res.body).to.have.property('password')
                    expect(res.body.username).to.equal('serafim')
                    expect(res.body.email).to.equal('sera@mail.com')
                    expect(res.body.password).to.not.equal('sera')
                    done()
                })
                .catch(err=>{
                    console.log(err)
                })
        })
        // it.only('should get an error status 400', function(done){
        //     chai
        //         .request(app)
        //         .post('/register')
        //         .send({
        //             username: '',
        //             email: '.com',
        //             password: ''
        //         })
        //         .then(function(res){
        //             expect(res).to.have.status(400)
        //             done()
        //         })
        //         .catch(err=>{
        //             console.log(err)
        //         })
        // })
    })
    // describe('POST /login', function(){
    //     it.only('should get status 200 and an object {token, username, email}', function(done){
    //         chai
    //             .request(app)
    //             .post('/login')
    //             .send({
    //                 email: 'sera@mail.com',
    //                 password: 'sera'
    //             })
    //             .then(function(res){
    //                 expect(res).to.have.status(200)
    //                 expect(res.body).to.have.property('token')
    //                 expect(res.body).to.have.property('username')
    //                 expect(res.body).to.have.property('email')
    //                 expect(res.body.token).to.not.be.an('undefined')
    //                 expect(res.body.username).to.not.be.an('undefined')
    //                 expect(res.body.email).to.not.be.an('undefined')
    //                 done()
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
            
    //     })
    // })
})