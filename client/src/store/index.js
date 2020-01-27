import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import router from '../router'
import Swal from 'sweetalert2'
import errorHandler from '../../config/errorHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    cities: [],
    destinationId: '',
    shippingFee: 0,
    transactions: [],
    isLoggedIn: false,
    allTransactions: []
  },
  mutations: {
    PUSH_PRODUCTS(state, products) {
      state.products = products
    },
    PUSH_CART_ITEMS(state, products) {
      state.cart = products
    },
    PUSH_CITIES(state, cities) {
      state.cities = cities
    },
    SET_SHIPPING_FEE(state, fee) {
      state.shippingFee = fee
    },
    PUSH_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    },
    SET_IS_LOGGED_IN(state, value) {
      state.isLoggedIn = value
    },
    PUSH_ALL_TRANSACTIONS(state, transactions) {
      state.allTransactions = transactions
    }
  },
  actions: {
    login({ commit }, payload) {
      const { email, password } = payload
      axios({
        method: 'post',
        url: '/user/login',
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          commit('SET_IS_LOGGED_IN', true)
        })
        .catch(({ response }) => {
          let errorMsg = errorHandler(response)
          Swal.fire({
            icon: 'error',
            text: errorMsg
          })
        })
    }, 

    register({ commit }, payload) {
      const { username, email, password } = payload
      axios({
        method: 'post',
        url: '/user/register',
        data: {
          username,
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          commit('SET_IS_LOGGED_IN', true)
        })
        .catch(({ response }) => {
          let errorMsg = errorHandler(response)
          Swal.fire({
            icon: 'error',
            text: errorMsg
          })
        })
    },

    fetchProducts(context) {
      axios({
        method: 'get',
        url: '/products',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJpYXQiOjE1Nzk1ODEwODV9.ungTmmV4Qz1CwCeXDiOy3Eym3tJ-ufpLvP0_EZd7h-8'
        }
      })
        .then(({ data }) => {
          context.commit('PUSH_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCartItems(context) {
      axios({
        method: 'get',
        url: '/user/cart',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJpYXQiOjE1Nzk1ODEwODV9.ungTmmV4Qz1CwCeXDiOy3Eym3tJ-ufpLvP0_EZd7h-8'
        }
      })
        .then(({ data }) => {
          console.log(data.cart, '<<')
          context.commit('PUSH_CART_ITEMS', data.cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart(context, payload) {
      const { productId, amount } = payload
      axios({
        method: 'post',
        url: '/user/cart',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJpYXQiOjE1Nzk1ODEwODV9.ungTmmV4Qz1CwCeXDiOy3Eym3tJ-ufpLvP0_EZd7h-8'
        },
        data: {
          productId,
          amount
        }
      })
        .then(({ data }) => {
          context.dispatch('fetchProducts')
          Swal.fire({
            icon: 'success',
            text: 'Successfully added'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCities(context, payload) {
      axios({
        method: 'get',
        url: '/user/cart/cities',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJpYXQiOjE1Nzk1ODEwODV9.ungTmmV4Qz1CwCeXDiOy3Eym3tJ-ufpLvP0_EZd7h-8'
        }
      })
        .then(({ data }) => {
          context.commit('PUSH_CITIES', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getShippingFee(context, payload) {
      axios({
        method: 'post',
        url: '/user/cart/shippingFee',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJpYXQiOjE1Nzk1ODEwODV9.ungTmmV4Qz1CwCeXDiOy3Eym3tJ-ufpLvP0_EZd7h-8'
        },
        data: {
          destination: payload.destinationId,
          weight: payload.weight
        }
      })
        .then(({ data }) => {
          context.commit('SET_SHIPPING_FEE', data.shippingFee)
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitCustomerForm(context, payload) {
      const { name, address, city, shippingFee, totalPrice } = payload
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/transactions',
          headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU3OTk1NjcxN30.jcQL52GAL8KVr4tvwcXABLrxmegpoe1_520Q1TwFlLU'
          },
          data: {
            name,
            address,
            city,
            shippingFee,
            totalPrice
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            console.log(err, '!!!!')
            reject(err)
          })
      })
      
    },

    fetchMyTransactions({ commit }) {
      axios({
        method: 'get',
        url: '/transactions',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU3OTk1NjcxN30.jcQL52GAL8KVr4tvwcXABLrxmegpoe1_520Q1TwFlLU'
        }
      })
        .then(({ data }) => {
          commit('PUSH_TRANSACTIONS', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err.response.data
          })
        })
    },

    changeTransactionStatus({ dispatch }, payload) {
      const { status, transactionId } = payload
      axios({
        method: 'patch',
        url: `/transactions/${transactionId}`,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU3OTk1NjcxN30.jcQL52GAL8KVr4tvwcXABLrxmegpoe1_520Q1TwFlLU'
        },
        data: {
          status
        }
      })
        .then(({ data }) => {
          let text = ''
          if (status === 'paid') {
            text = 'Your order is on process'
          } else if (status === 'delivered') {
            text = 'Thank you for your order'
          }
          Swal.fire({
            icon: 'success',
            text
          })
          dispatch('fetchMyTransactions')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            text: response.data.message
          })
        })
    },

    setUpdateForm({ }, productId) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/products/${productId}`,
          headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJjMzY2YjUwYWJhMzJlZmNhOTM1NGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgwMDcyMzczfQ.yDhmajtS5NVlp3l0FaKEDwLWllm_FY_qwNl3LvyPOm8'
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },

    updateProduct({ }, payload) {
      const { id, name, price, stock, description } = payload
      axios({
        method: 'patch',
        url: `/products/${id}`,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJjMzY2YjUwYWJhMzJlZmNhOTM1NGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgwMDcyMzczfQ.yDhmajtS5NVlp3l0FaKEDwLWllm_FY_qwNl3LvyPOm8'
        },
        data: {
          name,
          price,
          stock,
          description
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            text: 'Successfully updated'
          })
          router.push('/admin/products')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    },
    removeItemFromCart({ dispatch }, payload) {
      const { amount, productId } = payload
      Swal.fire({
        text: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `/user/cart/${productId}`,
            headers: {
              access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU4MDA3Nzg0NX0.oqTPF-l0zT1nUUXrin8lxdiTbXTXDvRfWTU6AP-JDlY'
            },
            data: {
              amount
            }
          })
            .then(({ data }) => {
              dispatch('fetchCartItems')
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                text: err
              })
            })
        }
      })
    },
    updateAmount({ dispatch }, payload) {
      const { amount, productId } = payload
      axios({
        method: 'patch',
        url: `/user/cart/${productId}`,
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI2N2U0MmM0ODc4YTU2YTJjOTliYzciLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTU4MDA3Nzg0NX0.oqTPF-l0zT1nUUXrin8lxdiTbXTXDvRfWTU6AP-JDlY'
        },
        data: {
          amount
        }
      })
        .then(({ data }) => {
          dispatch('fetchCartItems')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    },

    fetchAllTransactions({ commit }) {
      axios({
        method: 'get',
        url: '/transactions/admin',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTJjMzY2YjUwYWJhMzJlZmNhOTM1NGMiLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTgwMDg2ODI5fQ.so-tR9Q1434HdGKx-i30wzIIGhztyomxNnrRRaqtPa0'
        }
      })
        .then(({ data }) => {
          commit('PUSH_ALL_TRANSACTIONS', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err
          })
        })
    }
  },
  getters: {
    totalPrice (state) {
      let total = 0
      state.cart.forEach(function(product) {
        total += (product.amount * product.productId.price)
      })
      return total
    },
    totalWeight (state) {
      let total = 0
      state.cart.forEach(function(product) {
        total += product.amount * product.productId.weight
      })
      console.log(total)
      return total
    },
    destinationId (state) {
      for (let city of state.cities) {
        if (city.city_name === state.destination) {
          return city.city_id
        }
      }
    },
  }
})