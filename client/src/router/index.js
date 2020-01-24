import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sellpage from '../views/Sellpage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sell',
    name: 'sell',
    component: Sellpage
  }
  
]

const router = new VueRouter({
  routes
})

export default router
