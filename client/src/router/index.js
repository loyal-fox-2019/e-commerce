import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "prod" */ '../views/Products.vue'),
    children: [
      {
        path: '',
        name: 'all',
        component: () => import(/* webpackChunkName: "products" */ '../views/AllProducts.vue'),
      },
      {
        path: ':id',
        name: 'product',
        component: () => import(/* webpackChunkName: "product" */ '../views/ProductDetail.vue')
      }
    ] 
  },
  {
    path: '/cart',
    name: 'cart',
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        router.push('/')
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "cart" */ '../views/ShoppingCart.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        router.push('/')
      } else {
        next()
      }
    },
    component: () => import(/* webpackChunkName: "admin" */ '../views/UserDashboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
