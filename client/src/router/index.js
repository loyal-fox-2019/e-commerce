import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/mainpage.vue'
import ProductDetail from '../views/productdetail.vue'
import MyProducts from '../views/myproducts.vue'
import Cart from '../views/cart.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },{
    path: '/product/:id',
    name: 'products',
    component: ProductDetail
  },{
    path: '/user/products',
    name: 'myproducts',
    component: MyProducts
  },{
    path: '/user/cart',
    name: 'usercart',
    component: Cart
  },{
    path: '/login',
    name: 'login',
    component: Login
  },{
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
