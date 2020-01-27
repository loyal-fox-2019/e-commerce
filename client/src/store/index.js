import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    adminLogin: false,
    listProduct: [],
    CartItems: []
  },
  mutations: {
    getData(state, payload) {
      state.listProduct = payload
    },
    getCart(state, payload) {
      state.CartItems = payload
    }
  },
  actions: {
    fetchDataProduct() {
      axios
        .get('http://35.185.188.169:3000/products/')
        .then(({ data }) => {
          this.commit('getData', data)
        })
        .catch(({ response }) => {
          return response.data.message
        })
    },
    fetchDataCart() {
      axios
        .get('http://35.185.188.169:3000/cart', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.commit('getCart', data)
        })
        .catch(({ response }) => {
          return response.data.message
        })
    }
  },
  modules: {}
})
