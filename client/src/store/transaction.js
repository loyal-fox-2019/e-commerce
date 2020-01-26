import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    transactions: [],
    errors: null,
    success: null,
  },
  mutations: {
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    SET_SUCCESS(state, payload) {
      state.success = payload;
    },
  },
  actions: {
    async getTransactionsByCust({ commit, rootState }) {
      const headers = {
        token: rootState.token,
      };
      try {
        const { data } = await Axios.get('/transactions/costumer', { headers });
        commit('SET_TRANSACTIONS', data);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    },

    async getTransactions({ commit, rootState }) {
      const headers = {
        token: rootState.token,
      };
      try {
        const { data } = await Axios.get('/transactions', { headers });
        commit('SET_TRANSACTIONS', data);
      } catch ({ response }) {
        console.log(response.data.message);
      }
    },

    async createTransaction({ commit, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      try {
        await Axios.post('/transactions', payload, { headers });
        commit('SET_SUCCESS', {
          action: 'Transaction',
          msg: 'Add transaction success',
        });
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
        console.log(response.data.message);
      }
    },
  },
};
