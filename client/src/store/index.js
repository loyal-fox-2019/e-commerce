import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showRegisterLoginPage: true,
    user: null,
    allitem: null,
    productShow: null,
    userCart: null
  },
  mutations: {
    SET_USERS(state, payload) {
      state.user = payload
    },
    HIDE_LOGIN(state) {
      state.showRegisterLoginPage = false
    },
    SHOW_LOGIN(state) {
      state.showRegisterLoginPage = true
    },
    SET_ALLITEM(state, payload) {
      state.allitem = payload
    },
    SET_PRODUCTSHOW(state, payload) {
      state.productShow = payload
    },
    SET_USERCART(state, payload) {
      state.userCart = payload
    }
  },
  actions: {
    getUserLogin({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/users',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_USERS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addItem({ dispatch }, payload) {
      let formData = new FormData()
      formData.append('name', payload.name)
      formData.append('file', payload.file)
      formData.append('category', payload.category)
      formData.append('price', payload.price)
      formData.append('stock', payload.stock)
      formData.append('description', payload.description)
      axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('data hasbeen created ', data)
          dispatch('getAllItem')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllItem({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/products'
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ALLITEM', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addUserCart({ dispatch }, { payload, productId }) {
      let newCart = {
        count: payload
      }
      // console.log('ini dari store nya', productId)

      axios({
        method: 'post',
        url: `http://localhost:3000/transactions/${productId}`,
        data: newCart,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('getUserCart')
          console.log('cart hasbeen added ', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserCart({ commit }) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/transactions/user',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_USERCART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    cartCheckout({ commit, dispatch }, transactionId) {
      axios({
        method: 'post',
        url: `http://localhost:3000/transactions/checkout/${transactionId}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          sesuatu: 'sesuatu'
        }
      })
        .then(({ data }) => {
          console.log(data)
          dispatch('getUserCart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
