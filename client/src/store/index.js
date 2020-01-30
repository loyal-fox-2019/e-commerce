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
    checkout: [],
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
    SET_CHECKOUTCART(state, payload) {
      state.checkout = payload;
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
    fetchSendingAllCart({ commit }) {
      axios({
        method: 'GET',
        url: 'carts/sendingAll',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('SET_STATUSCART', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    fetchReceivedAllCart({ commit }) {
      axios({
        method: 'GET',
        url: 'carts/receivedAll',
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
    fetchCheckoutAllCart({ commit }) {
      axios({
        method: 'GET',
        url: 'carts/checkcoutAll',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          commit('SET_CHECKOUTCART', data);
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
    createGold(_, payload) {
      return axios({
        method: 'POST',
        url: 'products',
        data: payload,
        headers: {
          token: localStorage.getItem('token'),
        },
      });
    },
    deleteGold(_, payload) {
      return axios({
        method: 'DELETE',
        url: `products/${payload}`,
        headers: {
          token: localStorage.getItem('token'),
        },
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
    },
    sending(_, payload) {
      const value = {
        item: payload,
      };
      return axios({
        method: 'PUT',
        url: `carts/sending/${payload}`,
        data: value,
        headers: { token: localStorage.getItem('token') },
      });
    },
  },
  modules: {
  },
});
