import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barsGold: [],
    seriesGold: [],
    isLogin: false,
    cart: [],
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_BARSGOLD(state, payload) {
      state.barsGold = payload;
    },
    SET_SERIESGOLD(state, payload) {
      state.seriesGold = payload;
    },
    SET_CART(state, payload) {
      state.cart = payload;
    },
  },
  actions: {
    fetchBarsGold({ commit }) {
      axios({
        method: 'GET',
        url: 'products/bars',
      })
        .then(({ data }) => {
          commit('SET_BARSGOLD', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchSeriesGold({ commit }) {
      axios({
        method: 'GET',
        url: 'products/series',
      })
        .then(({ data }) => {
          commit('SET_SERIESGOLD', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchCart({ commit }) {
      axios({
        method: 'GET',
        url: 'carts',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('SET_BARSGOLD', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    login({ commit }, payload) {
      return axios({
        method: 'POST',
        url: 'users/login',
        data: payload,
      });
    },
    register({ commit }, payload) {
      return axios({
        method: 'POST',
        url: 'users/register',
        data: payload,
      });
    },
    GSign({ commit }, payload) {
      return axios({
        method: 'POST',
        url: 'users/gsign',
        data: payload,
      });
    },
  },
  modules: {
  },
});
