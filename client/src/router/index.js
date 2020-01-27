import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductForm from '../components/ProductForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/store',
    name: 'store',
    component: () => import(/* webpackChunkName: "store" */ '../views/Store.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
      {
        path: 'add-product',
        component: ProductForm
      },
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "products" */ '../views/AdminProducts.vue')
      },
      {
        path: 'update-product/:productId',
        component: () => import(/* webpackChunkName: "update-product" */ '../views/UpdateProduct.vue')
      },
      {
        path: 'transactions',
        component: () => import(/* webpackChunkName: "admin-transactions" */ '../views/AdminTransactions.vue')
      }
    ]
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import(/* webpackChunkName: "transactions" */ '../views/Transactions.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
