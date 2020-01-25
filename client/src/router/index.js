import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },
  {
    path: '/item',
    name: 'item',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Item.vue'),
  },
  {
    path: '/guitar/:guitarType',
    name: 'guitar',
    component: () =>
      import(/* webpackChunkName: "guitar" */ '@/views/Guitar.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
