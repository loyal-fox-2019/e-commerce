import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/LoginRegister',
    name: 'login-register',
    component: () => import(/* webpackChunkName: "login-register" */ '../views/loginRegister.vue')
  },
  {
    path: '/add-product',
    component: () => import(/* webpackChunkName: "login-register" */ '../views/AddProduct.vue'),
    beforeEnter: ( to, from, next ) => {
      if(!localStorage.getItem('token')) {
        router.push({path:'/LoginRegister'})
      } else {
        next()
      }
    }
  },
  {
    path: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/transaction',
    component: () => import(/* webpackChunkName: "transaction" */ '../views/Transaction.vue')
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue')
  },
  {
    path: '/:id',
    component: () => import(/* webpackChunkName: "detail" */ '../views/ProductDetail.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( ( to,from,next ) => {
  if( to.name === 'login-register') {
    if(localStorage.getItem('token')) {
      next({path:'/'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
