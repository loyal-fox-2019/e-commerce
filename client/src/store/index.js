import Vue from 'vue'
import Vuex from 'vuex'
import server from '@/helpers/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: [],
    transaction: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
      state.cart = []
      state.transaction = []
    }
  },
  actions: {
    async FETCH_PRODUCTS ({ commit }, payload) {
      try {
        let products = await server({
          url: '/products',
          method: 'GET'
        })
        commit('SET_PRODUCTS', products.data)
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    },
    async FETCH_CART ({ commit }, payload) {
      try {
        let cart = await server({
          url: '/cart',
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        commit('SET_CART', cart.data.cart)
      } catch (error) {
        Swal.fire(error.response.data.message)
      }
    }
  },
  getters: {
    products: state => {
      return state.products
    },
    cart: state => {
      return state.cart
    },
    transaction: state => {
      return state.transaction
    },
    isLogin: state => {
      return state.isLogin
    }
  },
  modules: {
  }
})
