import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontPage from '../views/FrontPage'
import Login from '../components/LoginForm'
import Register from '../components/Register'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'frontPage',
    component: FrontPage
  },
  {
    path:'/register',
    name: 'register',
    component: Register
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
