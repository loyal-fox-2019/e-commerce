import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'
import ItemDetail from '@/views/ItemDetail.vue'
import AddForm from '@/components/AddForm.vue'
import Transaction from '@/components/TransactionPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/4dm1n',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AdminPage.vue'),
    children: [
      {
        path: 'add-item',
        component: AddForm
      },
      {
        path: 'transaction',
        component: Transaction
      }
    ]
  },
  {
    path: '/brass',
    name: 'brass',
    component: CategoryDetail
  },
  {
    path: '/battery',
    name: 'battery',
    component: CategoryDetail
  },
  {
    path: '/front ensemble',
    name: 'frontensemble',
    component: CategoryDetail
  },
  {
    path: '/detail',
    name: 'detailItem',
    component: ItemDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
