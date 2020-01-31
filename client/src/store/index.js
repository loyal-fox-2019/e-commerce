import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/config/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
    cart: {
      _id: '',
      items: [],
    },
    guitars: [],
    guitar: {
      _id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
    },
    isLoading: false,
  },
  mutations: {
    UPDATE_IS_LOADING(state, payload) {
      state.isLoading = payload
    },
    UPDATE_GUITARS(state, payload) {
      state.guitars = payload.guitars
    },
    UPDATE_GUITAR(state, payload) {
      state.guitar = payload.guitar
    },
    UPDATE_USERNAME(state, payload) {
      state.username = payload.username
    },
    UPDATE_TOKEN(state, payload) {
      state.token = payload.token
    },
    UPDATE_CART(state, payload) {
      state.cart = payload.cart
    },
  },
  actions: {
    fetch_all_guitars(context) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .get('/items')
        .then(({ data }) => {
          context.commit('UPDATE_IS_LOADING', false)
          context.commit('UPDATE_GUITARS', { guitars: data.items })
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          console.log(err)
        })
    },
    fetch_singel_guitar(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .get(`/items/${payload.guitarId}`)
        .then(({ data }) => {
          context.commit('UPDATE_IS_LOADING', false)
          context.commit('UPDATE_GUITAR', { guitar: data.item })
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          console.log(err)
        })
    },
    fetch_user_cart(context) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .get('/carts', { headers: { token: context.state.token } })
        .then(({ data }) => {
          context.commit('UPDATE_IS_LOADING', false)
          context.commit('UPDATE_CART', { cart: data.cart })
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          console.log(err)
        })
    },
    login_normal(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .post('/login', {
          email: payload.email,
          password: payload.password,
        })
        .then(({ data }) => {
          context.commit('UPDATE_IS_LOADING', false)
          context.commit('UPDATE_USERNAME', { username: data.username })
          context.commit('UPDATE_TOKEN', { token: data.token })

          localStorage.setItem('token', data.token)

          payload.loader.hide()

          payload.vm.$toast.open({
            message: 'Login success',
            type: 'success',
            position: 'top-right',
          })
          payload.vm.$router.push('/')
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          payload.loader.hide()
          if (err.response) {
            payload.vm.$toast.open({
              message: err.response.data.errors,
              type: 'error',
              position: 'top-right',
            })
          } else {
            payload.vm.$toast.open({
              message: 'Error has happen, please reload the page',
              type: 'error',
              position: 'top-right',
            })
          }
        })
    },
    register(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .post('/register', {
          email: payload.email,
          username: payload.username,
          password: payload.password,
        })
        .then(({ data }) => {
          context.commit('UPDATE_IS_LOADING', false)
          context.commit('UPDATE_USERNAME', { username: data.username })
          context.commit('UPDATE_TOKEN', { token: data.token })

          localStorage.setItem('token', data.token)

          payload.vm.$toast.open({
            message: 'Registere success',
            type: 'success',
            position: 'top-right',
          })
          payload.vm.$router.push('/')
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          if (err.response) {
            payload.vm.$toast.open({
              message: err.response.data.errors.join(','),
              type: 'error',
              position: 'top-right',
            })
          } else {
            payload.vm.$toast.open({
              message: 'Error has happen, please reload the page',
              type: 'error',
              position: 'top-right',
            })
          }
        })
    },
    logout(context, payload) {
      context.commit('UPDATE_USERNAME', { username: '' })
      context.commit('UPDATE_TOKEN', { token: '' })

      localStorage.clear()

      payload.vm.$router.push('/')
      payload.vm.$toast.open({
        message: 'Logged out',
        type: 'success',
        position: 'top-right',
      })
    },
    check_session(context, payload) {
      api
        .get('/check-session', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(({ data }) => {
          context.commit('UPDATE_USERNAME', { username: data.username })
          context.commit('UPDATE_TOKEN', {
            token: localStorage.getItem('token'),
          })

          payload.loader.hide()

          payload.vm.$toast.open({
            message: 'Welcome back ' + data.username + ' :)',
            type: 'success',
            position: 'top-right',
          })
          payload.vm.$router.push('/')
        })
        .catch(err => {
          payload.loader.hide()
          if (err.response) {
            payload.vm.$toast.open({
              message: err.response.data.errors,
              type: 'error',
              position: 'top-right',
            })
          } else {
            payload.vm.$toast.open({
              message: 'Error has happen, please reload the page',
              type: 'error',
              position: 'top-right',
            })
          }
        })
    },
    remove_item_from_cart(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .delete('/carts/items', {
          headers: {
            token: context.state.token,
          },
          data: {
            itemId: payload.itemId,
          },
        })
        .then(({ data }) => {
          context.commit('UPDATE_IS_LOADING', false)
          payload.vm.$toast.open({
            message: 'Item removed',
            type: 'success',
            position: 'top-right',
          })
          context.dispatch('fetch_user_cart')
        })
        .catch(err => {
          context.commit('UPDATE_IS_LOADING', false)
          console.log(err)
        })
    },
    update_item_in_cart(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .request({
          method: 'patch',
          url: '/carts/items',
          data: {
            itemId: payload.itemId,
            quantity: payload.quantity,
          },
          headers: {
            token: context.state.token,
          },
        })
        .then(({ data }) => {
          payload.vm.$toast.open({
            message: 'Item updated',
            type: 'success',
            position: 'top-right',
          })
          context.dispatch('fetch_user_cart')
        })
        .catch(err => {
          if (err.response) console.log(err)
          else console.log(err)
        })
    },
    create_transaction(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .post(
          '/transactions',
          {},
          {
            headers: {
              token: context.state.token,
            },
          },
        )
        .then(({ data }) => {
          payload.vm.$toast.open({
            message: 'Cart checkedout',
            type: 'success',
            position: 'top-right',
          })
          payload.vm.confirmation = false
          context.dispatch('fetch_user_cart')
        })
        .catch(err => {
          if (err.response) console.log(err.response)
          else console.log(err)
        })
    },
    fetch_user_transactions(context, payload) {
      context.commit('UPDATE_IS_LOADING', true)

      api
        .get('/transactions', { headers: { token: context.state.token } })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          if (err.response) console.log(err.response)
          else console.log(err)
        })
    },
  },
  modules: {},
})
