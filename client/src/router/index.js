import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Cart from '@/views/Cart.vue'
import Transaction from '@/views/Transaction.vue'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,

    beforeEnter (to, from, next) {
      // check vuex store //
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need to login first!'
        })
        next('/')
      }
    }
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
