import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: {},
    carts: [],
    isUpdate: false,
    errors: null,
    success: null,
  },
  mutations: {
    SET_CART(state, payload) {
      state.cart = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
    SET_ISUPDATE(state, payload) {
      state.isUpdate = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    SET_SUCCESS(state, payload) {
      state.success = payload;
    },
  },
  actions: {
    async getCarts({ commit }) {
      const headers = {
        token: localStorage.getItem('ecommerce.token'),
      };
      console.log(headers);
      try {
        const { data } = await Axios.get('/carts', { headers });
        console.log(data);
        commit('SET_CARTS', data);
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
      }
    },
    async createCart({ commit, dispatch, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      try {
        await Axios.post('/carts', payload, { headers });
        commit('SET_SUCCESS', {
          action: 'add',
          msg: 'Add cart success',
        });
        dispatch('getCarts');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
      }
    },
    async updateAmountCart({ commit, dispatch, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      try {
        await Axios.patch(`/carts/amount/${payload._id}`, payload, { headers });
        commit('SET_SUCCESS', {
          action: 'Update',
          msg: 'Update amount cart success',
        });
        dispatch('getCarts');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
      }
    },
    async deleteCart({ commit, dispatch, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      try {
        await Axios.delete(`/carts/${payload}`, { headers });
        commit('SET_SUCCESS', {
          action: 'delete',
          msg: 'Delete cart success',
        });
        dispatch('getCarts');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
      }
    },
  },
};
