import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: null,
    itemsInCart: []
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
            token: localStorage.getItem('token')
          }
        )
        .then(() => {
          commit(newItem);
        })
        .catch(err => console.error(err));
    }
  },
  modules: {}
});
