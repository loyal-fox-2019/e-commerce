import Vue from 'vue'
import Vuex from 'vuex'
import item from './modules/item'
import cart from './modules/cart'
import transaction  from './modules/transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    role: null
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    },
    setRole(state,payload){
      state.role = payload
    }
  },
  actions: {
  },
  modules: {
    item,
    cart,
    transaction
  }
})
