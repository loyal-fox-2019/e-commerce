import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import listCategory from '../views/listCategory.vue'
import checkout from '../views/checkout.vue'
import admin from '../views/admin.vue'
import detail from '../components/detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
  {
    path: '/checkout',
    name: 'chekout',
    component: checkout
  },
  {
    path: '/:id',
    name: 'listCategory',
    component: listCategory,
    props: true,
    children: [
      {
        path: ':detail',
        name: 'detail',
        component: detail,
        props: true
      }
    ]

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
