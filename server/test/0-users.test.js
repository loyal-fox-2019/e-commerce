const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai

const {clearUsers, clearItems} = require('./helpers')
const app = require('../app')

chai.use(chaiHttp)

let userToken
let adminToken
let allItems = []

const newUserData = {
   email: "user1@mail.com",
   password: "asd123"
}

const newItemData1 = {
   name: 'Final Fantasy X',
   image: 'https://attackofthefanboy.com/wp-content/uploads/2019/04/final-fantasy-x-x-2-hd-remaster.jpg',
   price: 750000,
   stock: 3
}

const newItemData2 = {
   name: 'Final Fantasy VII: Remake',
   image: 'https://cdn.wccftech.com/wp-content/uploads/2019/09/Final-Fantasy-VII-Remake-Remake-Tifa.jpg',
   price: 850000,
   stock: 7
}

describe('/user', function() {
   after(async function() {
      console.log('clearing after user test')
      await clearUsers()
      await clearItems()
   })

   describe('POST /register', function() {
      it('should return an object with keys: "token" and "userId" - status 201', async function() {
         const registerResponse = await chai.request(app)
            .post('/register')
            .send(newUserData)

         expect(registerResponse).to.have.status(201)

         expect(registerResponse.body).to.have.property('token')
         expect(registerResponse.body.token).to.be.a('string')

         expect(registerResponse.body).to.have.property('userId')
         expect(registerResponse.body.userId).to.be.a('string')
      })
   })

   describe('POST /register - make duplicate error', function() {
      it('should return an object with keys: "message" - status 400', async function() {
         const registerResponse = await chai.request(app)
            .post('/register')
            .send(newUserData)
         
         expect(registerResponse).to.have.status(400)

         expect(registerResponse.body).to.have.property('message')
         expect(registerResponse.body.message).to.be.an('array')
         expect(registerResponse.body.message[0]).to.equal(`${newUserData.email} has been registered in our server.`)
      })
   })

   describe('POST /login', function() {
      it('should return an object with keys: "token" and "userId" - status 200', async function() {
         const loginResponse = await chai.request(app)
            .post('/login')
            .send(newUserData)

         
         expect(loginResponse).to.have.status(200)

         expect(loginResponse.body).to.have.property('token')
         expect(loginResponse.body.token).to.be.a('string')
         
         expect(loginResponse.body).to.have.property('userId')
         expect(loginResponse.body.userId).to.be.a('string')

         userToken = loginResponse.body.token
      })
   })

   describe('POST /createAdmin', function() {
      it('should return an object with keys: "token" - status 201', async function() {
         const createAdminResponse = await chai.request(app)
            .post('/createAdmin')

         expect(createAdminResponse).to.have.status(201)
         expect(createAdminResponse.body).to.have.property('token')
         expect(createAdminResponse.body.token).to.be.a('string')

         adminToken = createAdminResponse.body.token
      })
   })

   describe('Add an item to cart: PATCH /addToCart', function() {
      it('Should return an object called "results" with key "nModified" with value of 1 - status 200', async function() {
         const createItemResponse1 = await chai.request(app)
            .post('/item')
            .set({
               token: adminToken
            })
            .send(newItemData1)

         allItems.push(createItemResponse1.body.item)

         const createItemResponse2 = await chai.request(app)
            .post('/item')
            .set({
               token: adminToken
            })
            .send(newItemData2)

         allItems.push(createItemResponse2.body.item)

         const addToCartData = {
            itemId: allItems[1]._id,
            quantity: 2
         }

         const addToCartResponse = await chai.request(app)
            .patch('/user/add_to_cart')
            .set({
               token: userToken
            })
            .send(addToCartData)
         
         expect(addToCartResponse).to.have.status(200)
         expect(addToCartResponse.body.results.nModified).to.equal(1)
         expect(addToCartResponse.body.user.cart.length).to.equal(1)
      })
   })

   describe('Add the same item to cart: PATCH /addToCart', function() {
      it('Should return an object called user with key cart and the chat has length of 1 - status 200', async function() {
         const updateItemCartQuantity = {
            itemId: allItems[1]._id,
            quantity: 3
         }

         const updateCartResponse = await chai.request(app)
            .patch('/user/add_to_cart')
            .set({
               token: userToken
            })
            .send(updateItemCartQuantity)
         
         expect(updateCartResponse).to.have.status(200)
         expect(updateCartResponse.body.user.cart.length).to.equal(1)
         expect(updateCartResponse.body.user.cart[0].quantity).to.equal(3)
      })
   })

   describe('Remove item from cart: PATCH /remove_from_cart', function() {
      it('Should return an object called user with key cart and the cart has length of 0 - status 200', async function() {
         const removeItemFromCartData = {
            itemId: allItems[1]._id
         }

         const removeItemFromCartResp = await chai.request(app)
            .patch('/user/remove_from_cart')
            .set({
               token: userToken
            })
            .send(removeItemFromCartData)
         
         expect(removeItemFromCartResp).to.have.status(200)
         expect(removeItemFromCartResp.body.user.cart.length).to.equal(0)
      })
   })
})