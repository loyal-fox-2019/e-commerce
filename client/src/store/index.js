import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.config.js'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    username: '',
    allUserProducts: [],
    userProducts: [],
    otherUserProducts: [],
    userCart: [],
    transactions: []
  },
  mutations: {
    login(state, username){
      state.isLogin = true
      state.username = username
      if (username == 'admin'){
        state.isAdmin = true
      }
    },
    logout(state){
      state.isLogin = false
      state.username = ''
      state.isAdmin = false
    },
    setAllUserProducts(state, products){
      state.allUserProducts = products
    },
    setUserCart(state, products){
      state.userCart = []
      products.forEach((e) => {
        let productObj = {}
        productObj._id = e.productId._id
        productObj.name = e.productId.name
        productObj.price = e.productId.price
        productObj.image = e.productId.image
        productObj.stock = e.quantity
        productObj.userId = e.productId.userId
        state.userCart.push(productObj)
      })
    },
    setUserProducts(state, products){
      state.userProducts = products
    },
    setOtherUserProducts(state, products){
      state.otherUserProducts = products
    },
    setTransaction(state, transactions){
      state.transactions = transactions
    }
  },
  actions: {
    login({commit}, userData){
      return axios({
        method: 'POST',
        url: '/users/login',
        data: {
          user: userData.user,
          password: userData.password
        }
      })
        .then(({data}) => {
          commit('login', data.username)
          return data
        })
    },
    register({commit}, userData){
      return axios({
        method: 'POST',
        url: '/users/register',
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password
        }
      })
        .then(({data}) => {
          commit('login', data.username)
          return data
        })
    },
    getAllUserProducts({commit}){
      return axios({
        method: 'GET',
        url: '/products'
      })
        .then(({data}) => {
          commit('setAllUserProducts', data)
        })
    },
    getUserCart({commit}){
      axios({
        method: 'GET',
        url: '/users/cart',
        headers:{
          token: localStorage.getItem('access_token')
        } 
      })
        .then(({data}) => {
          commit('setUserCart', data)
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    },
    getUserProducts({commit}){
      return axios({
        method: 'GET',
        url: '/products/myItem',
        headers:{
          token: localStorage.getItem('access_token')
        } 
      })
        .then(({data}) => {
          commit('setUserProducts', data)
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    },
    getOtherUserProducts({commit}){
      axios({
        method: 'GET',
        url: '/users/cart',
        headers:{
          token: localStorage.getItem('access_token')
        } 
      })
        .then(({data}) => {
          commit('setUserCart', data)
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    },
    getTransaction({commit}){
      axios({
        method: 'GET',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          commit('setTransaction', data)
        })
        .catch((err) => {
          swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    },
    getAllTransaction({commit}){
      axios({
        method: 'GET',
        url: '/transactions/all',
        headers: {
          token: localStorage.getItem('access_token')
        }
      })
        .then(({data}) => {
          commit('setTransaction', data)
        })
        .catch((err) => {
          commit('setTransaction', [])
          swal.fire({
            icon: 'error',
            html: err.response.data.message
          })
        })
    }
  },
  modules: {
    
  }
})
