import Axios from 'axios';

export default {
  namespaced: true,
  state: {
    product: {
      name: '',
      price: '',
      stock: '',
      description: '',
      image: '',
    },
    products: [],
    isUpdate: false,
    errors: null,
    success: null,
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_PRODUCTS(state, payload) {
      console.log(payload);
      state.products = payload;
    },
    SET_PRODUCT_IMAGE(state, payload) {
      state.product.image = payload;
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
    CLEAR_PRODUCT(state) {
      state.product = {
        name: '',
        price: '',
        stock: '',
        description: '',
        image: '',
      };
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const { data } = await Axios.get('/products');
        commit('SET_PRODUCTS', data);
      } catch ({ response }) {
        console.log(response);
      }
    },
    async getProduct({ commit }, payload) {
      try {
        const { data } = await Axios.get(`/products/${payload}`);
        commit('SET_PRODUCT', data);
      } catch ({ response }) {
        console.log(response);
      }
    },
    async createProduct({ commit, dispatch, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      console.log(headers);
      try {
        await Axios.post('/products', payload, { headers });
        commit('CLEAR_PRODUCT');
        commit('SET_SUCCESS', {
          action: 'add',
          msg: 'Add product success',
        });
        dispatch('getProducts');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
        console.log(response.data.message);
      }
    },
    async updateProduct({ commit, dispatch, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      try {
        await Axios.put(`/products/${payload._id}`, payload, { headers });
        commit('CLEAR_PRODUCT');
        commit('SET_SUCCESS', {
          action: 'update',
          msg: 'Update product success',
        });
        dispatch('getProducts');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
        console.log(response.data.message);
      }
    },
    async uploadImage({ commit, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      try {
        const { data } = await Axios.post('/products/upload-image', payload, { headers });
        commit('SET_PRODUCT_IMAGE', data.image);
      } catch ({ response }) {
        // statements
        console.log(response);
      }
    },
    async deleteProduct({ commit, dispatch, rootState }, payload) {
      const headers = {
        token: rootState.token,
      };
      try {
        await Axios.delete(`/products/${payload}`, { headers });
        commit('SET_SUCCESS', {
          action: 'delete',
          msg: 'Delete product success',
        });
        dispatch('getProducts');
      } catch ({ response }) {
        commit('SET_ERRORS', response.data.message);
        console.log(response.data.message);
      }
    },
  },
};
