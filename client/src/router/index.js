import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sellpage from '../views/Sellpage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import MyProducts from '../views/MyProducts.vue'
import AllProducts from '../views/AllProducts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children : [
      {
        path : 'myproducts',
        name : 'myproducts',
        component : MyProducts,
      },
      {
        path : '',
        name : 'allproducts',
        component : AllProducts,
      },
    ]
  },
  {
    path: '/sell',
    name: 'sell',
    component: Sellpage
  },
  {
    path : '/login',
    name : 'login',
    component : Login,
  },
  {
    path : '/register',
    name : 'register',
    component : Register
  },
  {
    path : '/cart',
    name : 'cart',
    component : Cart
  },
  {
    path : '/admin',
    name : 'admin',
    component : AdminDashboard
  }
  
]

const router = new VueRouter({
  routes
})

export default router
