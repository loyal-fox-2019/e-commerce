import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    adminLogin: false,
    listProduct: []
  },
  mutations: {
    getData(state, payload) {
      state.listProduct = payload
    }
  },
  actions: {
    fetchDataProduct() {
      axios
        .get('http://localhost:3000/products/')
        .then(({ data }) => {
          this.commit('getData', data)
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    }
  },
  modules: {}
})
