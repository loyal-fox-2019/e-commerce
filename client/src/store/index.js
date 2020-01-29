import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.token,
    items: [],
    user: null
  },
  mutations: {
    SET_ISLOGGEDIN(state, payload) {
      state.isLoggedIn = payload
    },

    SET_ITEMS(state, payload) {
      state.items = payload
    },

    SET_USERNAME(state, payload) {
      state.username = payload
    },

    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
