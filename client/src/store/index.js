import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    isAdmin: false,
    loginStatus: false,
    loginId: null,
    categoryList: [
      {
        name: 'Brass',
        index: 0,
        image:
          'https://assets.dci.org/5b8d9945aaad8c0d5a2d8053_V49XGqF4YXXdTkU3WyyQT7FvyIZKiUVg.jpg'
      },
      {
        name: 'Battery',
        index: 1,
        image:
          'https://d2779tscntxxsw.cloudfront.net/5b5f0ee052d03.png?width=1200&quality=80'
      },
      {
        name: 'Front Ensemble',
        index: 2,
        image: 'https://i.ytimg.com/vi/zmZgDV3_DxA/maxresdefault.jpg'
      }
    ],
    activePage: {
      name: '',
      description: '',
      image: ''
    },
    allItem: null,
    editItem: null,
    transactionData: null,
    detailItem: null,
    cart: []
  },
  mutations: {
    LOGOUT(state) {
      Swal.fire('Logout Success', 'Thank you for coming!', 'success')
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      state.isAdmin = false
      state.loginStatus = false
      state.cart = []
    },
    CHANGE_ADMIN(state) {
      state.isAdmin = true
    },
    CHANGE_STATUS(state, val) {
      state.loginStatus = true
      state.loginId = val
    },
    SET_ITEM(state, data) {
      state.allItem = data
    },
    CHANGE_EDIT(state, data) {
      console.log(data)
      state.editItem = data
    },
    DETAIL_ITEM(state, data) {
      state.detailItem = data
    },
    GET_CART(state, data) {
      state.cart = data
    },
    ADD_TRANSACTION(state, data) {
      state.transactionData = data
    }
  },
  actions: {
    FETCH_ALL_ITEM(context) {
      Swal.showLoading()
      axios
        .get(`${this.state.baseUrl}/item`)
        .then(({ data }) => {
          Swal.close()
          context.commit('SET_ITEM', data)
        })
        .catch(err => {
          Swal.close()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.message
          })
        })
    },
    FETCH_ITEM(context) {
      console.log(this.state.activePage.name)
      Swal.showLoading()
      axios
        .get(
          `${this.state.baseUrl}/item/category/${this.state.activePage.name}`
        )
        .then(({ data }) => {
          Swal.close()
          context.commit('SET_ITEM', data)
        })
        .catch(err => {
          Swal.close()
          console.log('error', err.response)
        })
    },
    FETCH_CART(context) {
      axios
        .get(`${this.state.baseUrl}/cart/${localStorage.getItem('id')}`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(result => {
          console.log(result.data)
          context.commit('GET_CART', result.data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response
          })
        })
    },
    FETCH_TRANSACTION(context) {
      console.log('masuk fetch')
      axios
        .get(`${this.state.baseUrl}/cart/transaction`, {
          headers: { token: localStorage.getItem('token') }
        })
        .then(results => {
          context.commit('ADD_TRANSACTION', results)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  modules: {}
})
