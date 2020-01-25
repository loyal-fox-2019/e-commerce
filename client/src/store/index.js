import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categoryList: ['Brass', 'Battery', 'Front Ensemble'],
    activePage: {
      name: '',
      itemList: []
    }
  },
  mutations: {},
  actions: {
    GET_ALL_ITEM() {}
  },
  modules: {}
})
