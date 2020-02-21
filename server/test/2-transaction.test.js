const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai

const {clearUsers, clearItems, clearTransactions} = require('./helpers')
const app = require('../app')

let adminToken
let userToken
let allItems = []
let transactionData

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

describe('/transaction', function() {
   after(async function() {
      console.log('clearing after transaction test')
      await clearUsers()
      await clearItems()
      await clearTransactions()
   })

   describe('Create new transaction: POST /transaction', function() {
      it('Should return an object called "transaction" - status 201', async function() {
         // 1. create admin
         // 2. create two items
         // 3. create new user (the customer)
         // 4. add one item to cart
         // 5. checkout / create new transaction

         // 1. create admin

         const createAdminResponse = await chai.request(app)
            .post('/createAdmin')

         expect(createAdminResponse).to.have.status(201)
         expect(createAdminResponse.body.token).to.be.a('string')

         adminToken = createAdminResponse.body.token

         // 2. create two items
         
         let createItemResponse = await chai.request(app)
            .post('/item')
            .set({
               token: adminToken
            })
            .send(newItemData1)
         
         expect(createItemResponse).to.have.status(201)
         expect(createItemResponse.body.item.name).to.equal(newItemData1.name)
         
         allItems.push(createItemResponse.body.item)
         
         createItemResponse = await chai.request(app)
            .post('/item')
            .set({
               token: adminToken
            })
            .send(newItemData2)
         
         
         expect(createItemResponse).to.have.status(201)
         expect(createItemResponse.body.item.name).to.equal(newItemData2.name)

         allItems.push(createItemResponse.body.item)
         
         // 3. create new user (the customer)

         const newUserData = {
            email: "user1@mail.com",
            password: "asd123"
         }
         
         const createUserResponse = await chai.request(app)
            .post('/register')
            .send(newUserData)

         expect(createUserResponse).to.have.status(201)
         expect(createUserResponse.body.token).to.be.a('string')
         
         userToken = createUserResponse.body.token

         // 4. add one item to cart

         const addItemToCartData = {
            itemId: allItems[1]._id,
            quantity: 5
         }
         
         const addToCartResp = await chai.request(app)
            .patch('/user/add_to_cart')
            .set({
               token: userToken
            })
            .send(addItemToCartData)

         const createTransactionResp = await chai.request(app)
            .post('/transaction')
            .set({
               token: userToken
            })
         
         expect(createTransactionResp).to.have.status(201)
         expect(createTransactionResp.body.transaction.purchasedItems[0].item).to.equal(allItems[1]._id)

         transactionData = createTransactionResp.body.transaction
      })
   })

   describe('Getting all transactions: GET /transaction', function() {
      it('Should return an array of transactions - status 200', async function() {
         const getAllTransactionsResp = await chai.request(app)
            .get('/transaction')
            .set({
               token: adminToken
            })
         
         expect(getAllTransactionsResp).to.have.status(200)
         expect(getAllTransactionsResp.body.transactions[0].purchasedItems[0].item).to.equal(allItems[1]._id)
      })
   })

   describe('Get one populated transaction object: GET /transaction/:id', function() {
      it('Should return an object of transaction with the purchased items getting populated - status 200', async function() {
         const transactionResp = await chai.request(app)
            .get(`/transaction/${transactionData._id}`)
            .set({
               token: adminToken
            })
         
         expect(transactionResp).to.have.status(200)
         expect(transactionResp.body.transaction.purchasedItems[0].item._id).to.equal(allItems[1]._id)
      })
   })

   describe('Update delivery status to "sent": PATCH /transaction/:id', function() {
      it('Should return a results object with key nModified equal to 1 - status 200', async function() {
         const updateTransactionDeliveryStatusResp = await chai.request(app)
            .patch(`/transaction/${transactionData._id}`)
            .set({
               token: userToken
            })
            .send({
               status: 'delivered'
            })
         
         expect(updateTransactionDeliveryStatusResp).to.have.status(200)
         expect(updateTransactionDeliveryStatusResp.body.results.nModified).to.equal(1)
      })
   })

   describe('Get all transactions for one user: GET /transaction/user_transactions', function() {
      it('Should return an array of transactions of current user - status 200', async function() {
         const response = await chai.request(app)
            .get('/transaction/user_transactions')
            .set({
               token: userToken
            })
         
         console.log(response.body.transactions)
         expect(response).to.have.status(200)
         expect(response.body.transactions[0].purchasedItems[0].item).to.equal(allItems[1]._id)
      })
   })
})