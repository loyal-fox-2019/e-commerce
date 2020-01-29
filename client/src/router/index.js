import Vue from 'vue'
import VueRouter from 'vue-router'

import ItemList from '../views/ItemList.vue'
import Auth from '../views/Auth.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Cart from '../views/Cart.vue'
import Transaction from '../views/Transaction.vue'
import Admin from '../views/Admin.vue'

import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Auth
  },
  {
    path: '/register',
    name: 'register',
    component: Auth
  },
  {
    path: '/item/:id',
    name: 'itemDetail',
    component: ItemDetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction
  },
  {
    path: '/admin',
    name: 'adminHome',
    component: Admin
  },
  {
    path: '/',
    name: 'itemList',
    component: ItemList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = [
  'register',
  'login',
  'itemList',
  'itemDetail'
]

router.beforeEach((to, from, next) => {
  if(!whiteList.includes(to.name) && !localStorage.token) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Not logged in, redirecting...',
      showConfirmButton: false,
      timer: 1000
    })
    next({name: 'login'})
  }
  else {
    next()
  }
})

export default router
