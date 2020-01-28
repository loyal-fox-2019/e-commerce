import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: null,
    itemsInCart: [],
    listOfProducts: []
  },
  getters: {
    getUserProfile(state) {
      return state.userProfile;
    },
    getItemsInCart(state) {
      return state.itemsInCart;
    }
  },
  mutations: {
    updateProductList(state, newProductList) {
      state.listOfProducts = newProductList;
    },
    setUserProfile(state, newUserProfile) {
      state.userProfile = newUserProfile;
    },
    addItemInCart(state, item) {
      state.itemsInCart.push(item);
    },
    updateItemInCart(state, updatedList) {
      state.itemsInCart = updatedList;
    }
    // removeItemInCart(state, item) {}
  },
  actions: {
    createProduct({ commit }, newItem) {
      const formData = new FormData();
      formData.append('title', newItem.title);
      formData.append('description', newItem.description);
      formData.append('price', newItem.price);
      formData.append('stock', newItem.stock);
      formData.append('image', newItem.image);
      axios
        .post('http://localhost:3000/products', formData, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(() => axios.get('http://localhost:3000/products'))
        .then(({ data }) => {
          commit('updateProductList', data.data);
        })
        .catch(err => console.error(err));
    },
    getProductList({ commit }) {
      axios
        .get('http://localhost:3000/products')
        .then(({ data }) => {
          commit('updateProductList', data.data);
        })
        .catch(err => console.error(err));
    },
    createCart({ commit }, newItem) {
      axios
        .post(
          'http://localhost:3000/carts',
          {
            productId: newItem.product._id,
            totalItem: newItem.total,
            totalPrice: newItem.total * newItem.product.price
          },
          {
            headers: { token: localStorage.getItem('token') }
          }
        )
        .then(() => {
          commit(newItem);
        })
        .catch(err => console.error(err));
    }
    // updateCart({ commit }, updatedList) {
    //   axios.post();
    // }
  },
  modules: {}
});
