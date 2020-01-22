const chai = require('chai')
const chaiHttp = require('chai-http')
const {expect} = chai

const {clearUsers, clearItems} = require('./helpers')
const app = require('../app')

chai.use(chaiHttp)

let adminToken
let newItem
let allItems = []

describe('/item', function() {
   after(async function() {
      console.log('Clearing after item test')
      await clearUsers()
      await clearItems()
   })

   describe('Create new item: POST /item', async function() {
      it('Should return an object called "item" - status 201', async function() {
         const createAdminResponse = await chai.request(app)
            .post('/createAdmin')
   
         adminToken = createAdminResponse.body.token
   
         const newItemData = {
            name: 'Final Fantasy X',
            image: 'https://attackofthefanboy.com/wp-content/uploads/2019/04/final-fantasy-x-x-2-hd-remaster.jpg',
            price: 750000,
            stock: 3
         }
   
         const createItemResponse = await chai.request(app)
            .post('/item')
            .set({
               token: adminToken
            })
            .send(newItemData)
   
         expect(createItemResponse).to.have.status(201)
         expect(createItemResponse.body).to.have.property('item')
         expect(createItemResponse.body.item).to.be.an('object')
         expect(createItemResponse.body.item.name).to.equal(newItemData.name)
         expect(createItemResponse.body.item.image).to.equal(newItemData.image)
         expect(createItemResponse.body.item.price).to.equal(newItemData.price)
         expect(createItemResponse.body.item.stock).to.equal(newItemData.stock)
   
         newItem = createItemResponse.body.item
         allItems.push(newItem)
      })
   })

   describe('Get all items: GET /item', function() {
      it('Should return an array called "items" that contains all items - status 200', async function() {
         const newItemData = {
            name: 'Final Fantasy VII: Remake',
            image: 'https://cdn.wccftech.com/wp-content/uploads/2019/09/Final-Fantasy-VII-Remake-Remake-Tifa.jpg',
            price: 850000,
            stock: 7
         }

         const createItemResponse = await chai.request(app)
            .post('/item')
            .set({
               token: adminToken
            })
            .send(newItemData)
         
         allItems.push(createItemResponse.body.item)

         const getAllItemsResponse = await chai.request(app)
            .get('/item')
         
         expect(getAllItemsResponse).to.have.status(200)
         expect(getAllItemsResponse.body).to.have.property('items')
         expect(getAllItemsResponse.body.items).to.be.an('array')
         expect(getAllItemsResponse.body.items[0].name).to.equal(allItems[0].name)
         expect(getAllItemsResponse.body.items[1].name).to.equal(allItems[1].name)
      })
   })

   describe('Get one item: GET /item/:id', function() {
      it('Should return an object called "item" - status 200', async function() {
         const getOneItemResponse = await chai.request(app)
            .get(`/item/${allItems[1]._id}`)
         
         expect(getOneItemResponse).to.have.status(200)
         expect(getOneItemResponse.body).to.have.property('item')
         expect(getOneItemResponse.body.item._id).to.equal(allItems[1]._id)
      })
   })

   describe('Update one item name without changing its image: PATCH /item/:id', function() {
      it('Should return an object called "item" with name "Final Fantasy X - Remastered" with the same image as before', async function() {
         const updateData = {
            name: 'Final Fantasy X - Remastered',
            image: ''
         }

         const updateItemResponse = await chai.request(app)
            .patch(`/item/${allItems[0]._id}`)
            .set({
               token: adminToken
            })
            .send(updateData)
         
         expect(updateItemResponse).to.have.status(200)
         expect(updateItemResponse.body.item.name).to.equal(updateData.name)
         expect(updateItemResponse.body.item.image).to.equal(allItems[0].image)
      })
   })

   describe('Delete one item: DELETE /item/:id', function() {
      it('Should return an object with key "message"', async function() {
         const deleteOneItemResponse = await chai.request(app)
            .delete(`/item/${allItems[1]._id}`)
            .set({
               token: adminToken
            })
         
         expect(deleteOneItemResponse).to.have.status(200)
         expect(deleteOneItemResponse.body.message).to.equal('Delete item success')
      })
   })
})
