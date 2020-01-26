import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    username: '',
    pendings: [],
    paids: [],
    delivereds: []
  },
  mutations: {
    LOGIN (state) {
      state.isLogin = true
    },
    LOGOUT (state) {
      state.isLogin = false
      state.username = ''
      localStorage.clear()
    },
    FETCH_PRODUCTS (state, payload) {
      state.products = payload
    },
    FETCH_PENDING (state, payload) {
      state.pendings = payload
    },
    FETCH_PAID (state, payload) {
      state.paids = payload
    },
    FETCH_DELIVERED (state, payload) {
      state.delivereds = payload
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
        context.dispatch('fetchPaid')
        context.dispatch('fetchDelivered')
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
    fetchPaid (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/transactions/paid`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('FETCH_PAID', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchDelivered (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/transactions/delivered`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('FETCH_DELIVERED', data)
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
    },
    fetchMyProducts (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/products/own`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('FETCH_PRODUCTS', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchSale (context) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'GET',
          url: `/products/sale`,
          headers: {
            token: localStorage.getItem('token')
          }
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
