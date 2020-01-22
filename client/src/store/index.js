import Vue from 'vue';
import Swal from 'sweetalert2';
import Vuex from 'vuex';
import router from '../router';
import axios from '../config/server';

const wentWrong = 'Opps... Something when wrong';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    fullPage: true,
    userEmail: null,
    userFullname: null,
    products: [],
    myCart: {},
    currentProduct: null,
    isErr: false,
    error: null,
  },
  mutations: {
    SET_MYCART(state, payload) {
      state.myCart = payload;
    },
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
    async fectcMyCart({ commit }) {
      commit('SET_MYCART', {});
      commit('SET_ISLOADING', true);
      try {
        const response = await axios.get('/carts', { headers: { token: localStorage.getItem('token') } });
        const { data } = response;
        commit('SET_MYCART', data);
      } catch (err) {
        Swal.fire(wentWrong);
      } finally {
        setTimeout(() => {
          commit('SET_ISLOADING', false);
        });
      }
    },
    async delivered({ commit, dispatch }, payload) {
      try {
        await axios.patch(`carts/delivered/${payload}`, { headers: { token: localStorage.getItem('token') } });
        Swal.fire('Thank you, GL HF YOU NOOB!');
        dispatch('fectcMyCart');
        commit('SET_MYCART', null);
      } catch (err) {
        Swal.fire('Opps...');
      }
    },
    async checkout({ dispatch }, payload) {
      try {
        await axios.patch(`carts/checkout/${payload}`, { headers: { token: localStorage.getItem('token') } });
        Swal.fire('Checkout success, please wait for your skins');
        dispatch('fectcMyCart');
      } catch (err) {
        Swal.fire('Opps...');
      }
    },
    async removeCart({ commit }, payload) {
      try {
        await axios.delete(`/carts/${payload}`, { headers: { token: localStorage.getItem('token') } });
        commit('SET_MYCART', {});
      } catch (err) {
        // const text = err.response.data.errors.join(' | ');
        // Swal(text);
      } finally {
        commit('SET_MYCART', {});
        Swal.fire('Your cart deleted');
      }
    },
    // async removeItem({ commit, dispatch }, payload) {
    //   commit('SET_ISLOADING', true);
    //   try {
    //     const response = await axios
    //       .delete(`/carts/item/${payload}`,
    //       { headers: { token: localStorage.getItem('token') } });
    //     console.log(response);
    //     setTimeout(() => {
    //       dispatch('fectcMyCart');
    //       commit('SET_ISLOADING', true);
    //     }, 500);
    //   } catch (err) {
    //     Swal(wentWrong);
    //   }
    // },
    async add({ commit, dispatch }, payload) {
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
          dispatch('fectcMyCart');
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
    checkLogin({ commit, dispatch }) {
      commit('SET_ISLOADING', true);
      if (localStorage.getItem('token')) {
        commit('SET_LOGIN', true);
        commit('SET_FULLNAME', localStorage.getItem('fullname'));
        setTimeout(() => {
          router.push({ path: '/shopping' });
          commit('SET_ISLOADING', false);
          dispatch('fectcMyCart');
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
