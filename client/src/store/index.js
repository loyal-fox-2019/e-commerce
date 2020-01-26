import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosSet'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    myProducts: []
  },
  mutations: {
    fillProducts(state, payload) {
      state.products = payload
    },
    fillMyProducts(state, payload){
      state.myProducts = payload
    }
  },
  actions: {
    fetchProducts(context) {
      axios.get('products')
        .then(({ data }) => {
          context.commit('fillProducts', data)
        }).catch((err) => {
          console.log(err.response)
        });
    },
    fetchMyProducts(context) {
      axios.get('products/mine')
        .then(({ data }) => {
          context.commit('fillMyProducts', data)
        }).catch((err) => {
          console.log(err.response)
        });
    }
  },
  modules: {
  }
})
