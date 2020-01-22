import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    username: '',
    pendings: []
  },
  mutations: {
    LOGIN (state) {
      state.isLogin = true
    },
    LOGOUT (state) {
      state.isLogin = false
      localStorage.clear()
    },
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    },
    FETCH_PENDING (state, payload) {
      // console.log(payload)
      state.pendings = payload
    },
    SET_USERNAME (state, payload) {
      state.username = payload
    }
  },
  actions: {
    checkLogin (context) {
      if (localStorage.getItem('token') && localStorage.getItem('username')) {
        context.commit('LOGIN')
        context.commit('SET_USERNAME', localStorage.getItem('username'))
        context.dispatch('fetchPending')
      } else {
        context.commit('LOGOUT')
      }
    },
    fetchPending (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/transactions/pending`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('FETCH_PENDING', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchProducts (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/products`
        })
          .then(({ data }) => {
            context.commit('FETCH_PRODUCTS', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
