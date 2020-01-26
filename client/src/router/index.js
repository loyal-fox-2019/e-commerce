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
    path: '/guitars/:guitarType',
    name: 'guitar',
    component: () =>
      import(/* webpackChunkName: "guitar" */ '@/views/Guitar.vue'),
  },
  {
    path: '/guitar/:guitarId',
    name: 'guitar-detail',
    component: () =>
      import(
        /* webpackChunkName: "guitar-detail" */ '@/views/GuitarDetail.vue'
      ),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
