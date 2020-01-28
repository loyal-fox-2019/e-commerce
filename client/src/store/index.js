import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: true,
    isLogin: false,
    success: false,
    fail: false,
    successMessage: '',
    failMessage: []
  },
  mutations: {
    emptySuccessMessage(state) {
      state.successMessage = ''
      state.success = false
    },
    emptyFailMessage(state) {
      state.failMessage = []
      state.fail = false
    },
    isLogin(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    }
  },
  actions: {
    
  },
  modules: {
    product
  }
})
