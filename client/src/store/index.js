import Vue from 'vue'
import Vuex from 'vuex'
import item from './modules/item'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
    item,
    cart
  }
})
