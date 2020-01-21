import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import axios from '../config/server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    fullPage: true,
    userEmail: null,
    userFullname: null,
    products: [],
  },
  mutations: {
    SET_ISLOADING(state, payload) {
      state.isLoading = payload;
    },
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_FULLNAME(state, payload) {
      state.userFullname = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    checkLogin({ commit }) {
      commit('SET_ISLOADING', true);
      if (localStorage.getItem('token')) {
        commit('SET_LOGIN', true);
        commit('SET_FULLNAME', localStorage.getItem('fullname'));
        setTimeout(() => {
          router.push({ path: '/shopping' });
          commit('SET_ISLOADING', false);
        }, 500);
      } else {
        commit('SET_LOGIN', false);
        setTimeout(() => {
          router.push({ path: '/' });
          commit('SET_ISLOADING', false);
        }, 500);
      }
    },
    async fetchProducts({ commit }) {
      commit('SET_ISLOADING', true);
      const products = await axios.get('/products');
      const { data } = products;
      commit('SET_PRODUCTS', data);
    },
  },
  modules: {
  },
});
