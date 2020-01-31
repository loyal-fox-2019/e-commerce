import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/config.axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: []
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.isLoggedIn = payload
    },
    FETCH_PRODUCTS(state, payload) {
      state.products = payload
    }
  },
  actions: {
    fetchProducts(context) {
      axios.get('products')
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
