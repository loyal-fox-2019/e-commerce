import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosSet'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    myProducts: [],
    myCarts: [],
    myPaids: [],
    myItems: []
  },
  mutations: {
    fillProducts(state, payload) {
      state.products = payload
    },
    fillMyProducts(state, payload){
      state.myProducts = payload
    },
    fillMyCart(state, payload){
      state.myCarts = payload
    },
    fillMyPaid(state,payload){
      state.myPaids = payload
    },
    fillMyItem(state,payload){
      state.myItems = payload
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
    },
    fetchMyCart(context){
      axios.get('carts/pending')
      .then(({data}) => {
        context.commit('fillMyCart', data)
      }).catch((err) => {
        console.log(err.response.data)
      });
    },
    fetchMyPaid(context){
      axios.get('carts/paid')
      .then(({data}) => {
        context.commit('fillMyPaid', data)
      }).catch((err) => {
        console.log(err.response.data)
      });
    },
    fetchMyItem(context){
      axios.get('carts/deliver')
      .then(({data}) => {
        context.commit('fillMyItem', data)
      }).catch((err) => {
        console.log(err.response.data)
      });
    }
  },
  modules: {
  }
})
