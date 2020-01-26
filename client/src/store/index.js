import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Product from './product';
import Cart from './cart';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    isLogin: false,
    errors: null,
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_ISLOGIN(state, payload) {
      state.isLogin = {
        userId: payload._id,
        email: payload.email,
        fullname: payload.fullname,
        role: payload.role,
      };
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
  },
  actions: {
    async register({ commit, dispatch }, payload) {
      try {
        const { data } = await Axios.post('/auth/register', payload);
        commit('SET_TOKEN', data.token);
        dispatch('tokenIsValid', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
        console.log(response.data.message);
      }
    },
    async login({ commit, dispatch }, payload) {
      try {
        const { data } = await Axios.post('/auth/login', payload);
        localStorage.setItem('ecommerce.token', data.token);
        dispatch('tokenIsValid', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
        console.log(response.data.message);
      }
    },
    async tokenIsValid({ commit }, payload) {
      try {
        const { data } = await Axios.post('/users/isvalid', payload);
        localStorage.setItem('ecommerce.token', payload.token);
        commit('SET_TOKEN', payload.token);
        commit('SET_ISLOGIN', data);
        console.log('success');
      } catch ({ response }) {
        localStorage.clear();
        commit('SET_ERRORS', response.data.message);
        console.log(response.data.message);
      }
    },
  },
  modules: {
    Product,
    Cart,
  },
});
