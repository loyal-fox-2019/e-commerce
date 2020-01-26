import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    cities: [],
    destinationId: '',
    shippingFee: 0
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
    }
  },
  actions: {
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
          console.log(data, '<<<<<')
          context.commit('SET_SHIPPING_FEE', data.shippingFee)
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitCustomerForm(context, payload) {
      const { name, address, city, shippingFee } = payload
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
            shippingFee
          }
        })
          .then(({ data }) => {
            console.log(data, '@@@@')
            resolve(data)
          })
          .catch(err => {
            reject(err)
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