import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      { name: 'playstation', bg: 'https://storage.googleapis.com/h8-ecommerce-storage2/playstation.jpeg' },
      { name: 'xbox', bg: 'https://storage.googleapis.com/h8-ecommerce-storage2/xbox.jpeg' },
      { name: 'switch', bg: 'https://storage.googleapis.com/h8-ecommerce-storage2/switch.jpeg' }
    ],
    isLogin: false,
    allProducts: null,
    isAdmin: false,
    chosenDetail: null,
    totalCart: 0,
    cartItems: []
  },
  mutations: {
    SET_LOGIN (state) {
      state.isLogin = true
    },
    SET_ALLPRODUCTS (state, payload) {
      state.allProducts = payload
    },
    SET_ADMIN (state) {
      state.isAdmin = true
    },
    SET_LOGOUT (state) {
      state.isLogin = false
      state.isAdmin = false
      localStorage.clear()
    },
    SET_DETAILEDPRODUCT (state, payload) {
      state.chosenDetail = payload
    },
    SET_CARTITEMS (state, payload) {
      state.cartItems = payload
    },
    SET_CARTTOTAL (state, payload) {
      state.totalCart = payload
    }
  },
  actions: {
    webLogin (state, payload) {
      axios({
        method: 'post',
        url: 'http://52.221.193.12:3000/users/login',
        data: payload
      })
        .then(({ data }) => {
          if (data.email) {
            // console.log(data.token)
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.email)
            this.commit('SET_LOGIN')
            this.commit('SET_ADMIN')
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Welcome!',
              text: 'You have successfully logged in'
            })
            localStorage.setItem('token', data.token)
            this.commit('SET_LOGIN')
          }
        })
        .catch(err => {
          // console.log(err.response.data)
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    webRegister (state, payload) {
      axios({
        method: 'post',
        url: 'http://52.221.193.12:3000/users',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Welcome!',
            text: 'You have successfully been registered'
          })
          localStorage.setItem('token', data)
          this.commit('SET_LOGIN')
        })
        .catch(err => {
          // console.log(err.response.data)
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    getAllProducts (state) {
      axios({
        method: 'get',
        url: 'http://52.221.193.12:3000/products'
      })
        .then(({ data }) => {
          this.commit('SET_ALLPRODUCTS', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data,
            text: err.response.status
          })
        })
    },
    userCart (state) {
      axios({
        method: 'get',
        url: 'http://52.221.193.12:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let total = 0
          this.commit('SET_CARTITEMS', data)
          data.forEach(item => {
            let totalPrice = Number(item.qty) * Number(item.productId.price)
            total += totalPrice
          })
          this.commit('SET_CARTTOTAL', total)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: JSON.stringify(err.response.data),
            text: err.response.status
          })
        })
    },
    addCart (state, payload) {
      axios({
        method: 'post',
        url: 'http://52.221.193.12:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        },
        data: payload
      })
        .then(sucess => {
          Swal.fire({
            icon: 'success',
            title: 'Item successfully added to cart',
            text: 'Cart updated'
          })
          this.dispatch('userCart')
        })
    },
    deleteItem (state, payload) {
      Swal.fire({
        title: 'Are you sure you want to remove this item from your cart?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to remove this item'
      }).then((result) => {
        if (result.value) {
          return axios({
            method: 'delete',
            url: 'http://52.221.193.12:3000/cart/' + payload,
            headers: {
              token: localStorage.getItem('token')
            }
          })
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Your Item has been removed from your cart.',
            'success'
          )
          this.dispatch('userCart')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    checkOut () {
      axios({
        method: 'delete',
        url: 'http://52.221.193.12:3000/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'CheckOut Success',
            'Your items has successfully been Checked Out',
            'success'
          )
          this.dispatch('userCart')
          this.dispatch('getAllProducts')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    createProduct (state, payload) {
      let data = new FormData()
      data.append('productName', payload.productName)
      data.append('productImage', payload.file)
      data.append('description', payload.productDesc)
      data.append('price', payload.productPrice)
      data.append('stock', payload.productStock)
      data.append('category', payload.productCategory)
      axios({
        method: 'post',
        url: 'http://52.221.193.12:3000/products',
        data: data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Add Product Success',
            'You have successfully added a product',
            'success'
          )
          this.dispatch('getAllProducts')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    editProduct (state, payload) {
      let data = new FormData()
      data.append('productName', payload.productName)
      data.append('productImage', payload.file)
      data.append('description', payload.productDesc)
      data.append('price', payload.productPrice)
      data.append('stock', payload.productStock)
      data.append('category', payload.productCategory)
      // console.log(data)
      axios({
        method: 'put',
        url: 'http://52.221.193.12:3000/products/' + payload.id,
        data: data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.dispatch('getAllProducts')
          Swal.fire(
            'Edit Product Success',
            'You have successfully edited a product',
            'success'
          )
          router.go(-1)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    },
    deleteProduct (state, payload) {
      Swal.fire({
        title: 'Are you sure you want to delete this product?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to delete this product'
      })
        .then((result) => {
          if (result.value) {
            return axios({
              method: 'delete',
              url: 'http://52.221.193.12:3000/products/' + payload,
              headers: {
                token: localStorage.getItem('token')
              }
            })
          }
        })
        .then(({ data }) => {
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
          this.dispatch('getAllProducts')
          router.go(-1)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err
          })
        })
    }
  }
})
