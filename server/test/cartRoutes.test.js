const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../routes/productsRoutes')
chai.use(chaiHttp)
const expect = chai.expect

describe("Cart's Create and Delete", function(){
    describe("POST /cart/:productId", function(){
        it('should send an object with status code 200',function(done){
            chai
                .request(app)
                .post('/cart/5e2b00415326ed66a40b4892')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiY2E1YmU5MmU3NDMwZDVhMGI4MjMiLCJlbWFpbCI6InF3ZUBtYWlsLmNvbSIsImlhdCI6MTU3OTk1NDkyOH0.IZuNQudE1gRxhTl_s3VayprCN12_ogmOW1EO-Ea2KkU')
                .send({
                    UserId: "5e2af537c6ea4c5c9bd8d630",
                    Quantity: 6,
                    isCheckOut: false
                })
                .then(function(res){
                    console.log(res)
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
        it('should send an object with status code 200',function(done){
            chai
                .request(app)
                .delete('/cart/5e2c330c1bbb2f6a43f2f4a8')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiY2E1YmU5MmU3NDMwZDVhMGI4MjMiLCJlbWFpbCI6InF3ZUBtYWlsLmNvbSIsImlhdCI6MTU3OTk1NDkyOH0.IZuNQudE1gRxhTl_s3VayprCN12_ogmOW1EO-Ea2KkU')
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
    describe("GET /cart", function(){
        it('should send an object with status code 200',function(done){
            chai
                .request(app)
                .get('/cart')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiY2E1YmU5MmU3NDMwZDVhMGI4MjMiLCJlbWFpbCI6InF3ZUBtYWlsLmNvbSIsImlhdCI6MTU3OTk1NDkyOH0.IZuNQudE1gRxhTl_s3VayprCN12_ogmOW1EO-Ea2KkU')
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
    describe("GET /cart/history", function(){
        it('should send an object with status code 200',function(done){
            chai
                .request(app)
                .get('/cart')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiY2E1YmU5MmU3NDMwZDVhMGI4MjMiLCJlbWFpbCI6InF3ZUBtYWlsLmNvbSIsImlhdCI6MTU3OTk1NDkyOH0.IZuNQudE1gRxhTl_s3VayprCN12_ogmOW1EO-Ea2KkU')
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
    describe("PATCH /cart", function(){
        it('should send an object with status code 200',function(done){
            chai
                .request(app)
                .patch('/cart')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJiY2E1YmU5MmU3NDMwZDVhMGI4MjMiLCJlbWFpbCI6InF3ZUBtYWlsLmNvbSIsImlhdCI6MTU3OTk1NDkyOH0.IZuNQudE1gRxhTl_s3VayprCN12_ogmOW1EO-Ea2KkU')
                .send({
                    qty: 15
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
// router.patch('/',authenticate, CartController.checkOutCart)
})