import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../server';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barsGold: [],
    seriesGold: [],
    isLogin: false,
    cart: null,
    sending: [],
    received: [],
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
    SET_STATUSCART(state, payload) {
      state.sending = payload;
    },
    SET_RECEIVEDCART(state, payload) {
      state.received = payload;
    },
  },
  actions: {
    checkout(_, payload) {
      return axios({
        method: 'PUT',
        url: `carts/checkout/${payload}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
    },
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
    fetchSendingCart({ commit }) {
      axios({
        method: 'GET',
        url: 'carts/sending',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_STATUSCART', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchReceivedCart({ commit }) {
      axios({
        method: 'GET',
        url: 'carts/received',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('SET_RECEIVEDCART', data);
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
          commit('SET_CART', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    login(_, payload) {
      return axios({
        method: 'POST',
        url: 'users/login',
        data: payload,
      });
    },
    register(_, payload) {
      return axios({
        method: 'POST',
        url: 'users/register',
        data: payload,
      });
    },
    GSign(_, payload) {
      return axios({
        method: 'POST',
        url: 'users/gsign',
        data: payload,
      });
    },
    addItem(_, payload) {
      const value = {
        item: payload,
      };
      return axios({
        method: 'PUT',
        url: 'carts/add',
        data: value,
        headers: { token: localStorage.getItem('token') },
      });
    },
    deleteItem(_, payload) {
      const value = {
        item: payload,
      };
      return axios({
        method: 'PUT',
        url: 'carts/delete',
        data: value,
        headers: { token: localStorage.getItem('token') },
      });
    },
    received(_, payload) {
      const value = {
        item: payload,
      };
      return axios({
        method: 'PUT',
        url: `carts/received/${payload}`,
        data: value,
        headers: { token: localStorage.getItem('token') },
      });
    }
  },
  modules: {
  },
});
