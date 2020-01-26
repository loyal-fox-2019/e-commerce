import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import LandingPage from '../views/LandingPage.vue'
import MyItem from '../views/MyItem.vue'
import NewItem from '../views/NewItem.vue'
import MyCart from '../views/MyCart.vue'
import EditItem from '../views/EditItem.vue'
import TransactionPage from '../views/TransactionPage.vue'
import ProductForm from '../components/ProductForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    beforeEnter(to, from, next){
      if (localStorage.getItem('access_token')){
        next('/home')
      }
      else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    beforeEnter(to, from, next){
      if (localStorage.getItem('access_token')){
        next('/home')
      }
      else {
        next()
      }
    }
  },
  {
    path: '/items',
    name: 'myItem',
    component: MyItem
  },
  {
    path: '/new',
    name: 'postItem',
    component: NewItem
  },
  {
    path: '/cart',
    name: 'cart',
    component: MyCart
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditItem,
    children: [
      {
        path: ':id',
        component: ProductForm
      }
    ]
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: TransactionPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
