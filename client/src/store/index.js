import Vue from 'vue';
import Swal from 'sweetalert2';
import Vuex from 'vuex';
import Axios from 'axios';
import router from '../router';
import axios from '../config/server';

const wentWrong = 'Opps... Something when wrong';
// const BASE_URL = 'http://34.69.229.146';
const BASE_URL = 'http://localhost:3000';

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
    transactions: null,
    isAdmin: false,
  },
  mutations: {
    SET_ADMIN(state, payload) {
      state.isAdmin = payload;
    },
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
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    },
  },
  actions: {
    async fetchTransactionsHistory({ commit }) {
      try {
        const response = await Axios({
          method: 'GET',
          url: `${BASE_URL}/transactions`,
          headers: {
            token: localStorage.getItem('token'),
          },
        });
        const { data } = response;
        commit('SET_TRANSACTIONS', data);
      } catch (err) {
        Swal.fire('Opps... You are not admin!');
      }
    },
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
    async delivered({ dispatch }, payload) {
      try {
        await axios.patch(`carts/delivered/${payload}`, { headers: { token: localStorage.getItem('token') } });
        Swal.fire('Thank you, GL HF YOU NOOB!');
        dispatch('fectcMyCart');
      } catch (err) {
        Swal.fire('Opps...');
      }
    },
    async checkout({ dispatch }, payload) {
      try {
        await axios.patch(
          `carts/checkout/${payload.id}`, payload,
          { headers: { token: localStorage.getItem('token') } },
        );
        Swal.fire('Checkout success, please wait for your skins');
        dispatch('fectcMyCart');
      } catch (err) {
        Swal.fire('Opps...');
      }
    },
    async removeCart({ commit, dispatch }, payload) {
      try {
        await axios.delete(`/carts/${payload}`, { headers: { token: localStorage.getItem('token') } });
        dispatch('fectcMyCart');
        commit('SET_MYCART', {});
      } catch (err) {
        //
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
      if (localStorage.getItem('email') === 'admin@csskins.com') {
        commit('SET_ADMIN', true);
        dispatch('fetchTransactionsHistory');
      } else {
        commit('SET_ADMIN', false);
      }
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
  getters: {
    getTotal(state) {
      if (!state.myCart) {
        return 0;
      }
      let price = 0;••••••••
      state.myCart.items.forEach((item) => {
        price += item.price;
      });
      return price;
    },
    totalPrice(state) {
      if (!state.myCart) {
        return 'Rp 0';
      }
      let price = 0;
      let priceToShow = '';
      let counter = 0;
      const priceToString = price.toString();
      state.myCart.items.forEach((item) => {
        price += item.price;
      });
      for (let i = priceToString.length - 1; i >= 0; i -= 1) {
        if (counter === 2 && i !== 0) {
          priceToShow = `,${priceToString[i]}${priceToShow}`;
          counter = 0;
        } else {
          priceToShow = `${priceToString[i]}${priceToShow}`;
          counter += 1;
        }
      }
      return `Rp ${priceToShow}`;
    },
  },
});
