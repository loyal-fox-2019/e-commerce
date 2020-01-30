import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginRegister from '../views/LoginRegister.vue'
import MyProducts from '../views/MyProducts.vue'
import UserDetail from '../views/UserDetail.vue'
import Cart from '../views/Cart.vue'
import Profpic from '../components/Profpic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/loginregister',
    name: 'login-register',
    component: LoginRegister
  },
  {
    path: '/myproducts',
    name: 'my-products',
    component: MyProducts
  },
  {
    path: '/user',
    name: 'user',
    component: UserDetail,
    children: [{
      name: "profpic",
      path: "profpic",
      component: Profpic
    }]
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
