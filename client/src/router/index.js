import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/RegisterLogin.vue'
import ProductList from '../views/ProductList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Register
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList,
    children: [
      {
        path: 'productshow',
        component: () => import('../components/ProductShow.vue')
      }
    ]
  },
  {
    path: '/additem',
    name: 'addItem',
    component: () => import('../views/AddItem.vue')
  },
  {
    path: '/usercart',
    name: 'userCart',
    component: () => import('../views/UserCart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
