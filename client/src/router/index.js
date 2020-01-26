import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
// import Cart from '../views/OnCart.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: Login
  },
  {
    path: '/register',
    redirect: '/login',
  },
  {
    path: '/cart',
    name: 'OnCart',
    component: () => import(/* webpackChunkName: "about" */ '../views/OnCart.vue'),
    children: [
      {
        path: 'mycart',
        name: 'mycart',
        component: () => import(/* webpackChunkName: "about" */ '../views/cart/MyCart.vue')
      },
      {
        path: 'mypaid',
        name: 'mypaid',
        component: () => import(/* webpackChunkName: "about" */ '../views/cart/MyPaid.vue')
      },
      {
        path: 'myitem',
        name: 'myitem',
        component: () => import(/* webpackChunkName: "about" */ '../views/cart/MyItems.vue')
      },
      {
        path: 'myproduct',
        name: 'myproduct',
        component: () => import(/* webpackChunkName: "about" */ '../views/cart/MyProduct.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
