import Vue from 'vue';
import Swal from 'sweetalert2';
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
    currentProduct: null,
    isErr: false,
    error: null,
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
    SET_CURRENTPRODUCT(state, payload) {
      state.currentProduct = payload;
    },
  },
  actions: {
    async add({ commit }, payload) {
      commit('SET_ISLOADING', true);
      let messageSwal = null;
      try {
        const response = await axios.post('/carts', payload, { headers: { token: localStorage.getItem('token') } });
        const { message } = response.data;
        messageSwal = message;
      } catch (err) {
        const { errors } = err.response.data;
        console.log(errors);
        commit('SET_ERROR', errors);
      } finally {
        setTimeout(() => {
          commit('SET_ISLOADING', false);
          Swal.fire(messageSwal);
        }, 500);
      }
    },
    setCurrentProject({ commit }, payload) {
      commit('SET_ISLOADING', true);
      setTimeout(() => {
        commit('SET_ISLOADING', false);
        commit('SET_CURRENTPRODUCT', payload);
      }, 500);
    },
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
    findSkins({ commit }, payload) {
      commit('SET_ISLOADING', true);
      setTimeout(() => {
        commit('SET_PRODUCTS', payload);
        commit('SET_ISLOADING', false);
      }, 500);
    },
    async fetchProducts({ commit }) {
      commit('SET_ISLOADING', true);
      commit('SET_PRODUCTS', []);
      const products = await axios.get('/products');
      setTimeout(() => {
        const { data } = products;
        commit('SET_ISLOADING', false);
        commit('SET_PRODUCTS', data);
      }, 500);
    },
  },
  modules: {
  },
});
