import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
// User
import Login from '../views/Login.vue'
import Register from '../components/Register.vue'
// end of user
// Inventori
import Bag from '../views/Bag.vue'
import Profile from '../views/Profile.vue'
import MyProfile from '../components/MyProfile.vue'
import SellList from '../components/Jual/Sell-List'
import DetailBarang from '../components/Beli/DetailBarang.vue'
import BuyList from '../components/Beli/Buy-List.vue'
// import RekapPembelian from '../components/Beli/RekapPembelian';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // user
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next('/')
      } else {
        next()
      }
    }
  },
  // end of user
  {
    path: '/inv/:userId/:idBarang',
    component: DetailBarang,
    props: true,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/bag',
    name: 'bag',
    component: Bag
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    children: [
      {
        path: '/',
        name: 'my-profile',
        component: MyProfile
      },
      {
        path: 'sell-list',
        name: 'sell-list',
        component: SellList
      },
      {
        path: 'buy-list',
        name: 'buy-list',
        component: BuyList
      }
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  store
})

export default router
