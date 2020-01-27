import Vue from 'vue'
import VueRouter from 'vue-router'
import Categories from '../views/Categories.vue'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import Category from '../views/Category.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Admin from '../views/Admin.vue'
import MiniCart from '../views/MiniCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/categories',
    name: 'categories',
    component: Categories
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/categories/:category',
    name: 'category',
    component: Category
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/:productId',
    name: 'ProductDetails',
    component: ProductDetails,
    children: [
      {
        path: '/:productId/miniCart',
        name: 'MiniCart',
        component: MiniCart
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
