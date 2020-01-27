import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing'
      component: () => import('./views/Landing.vue')
    },
    {
      path:'/home',
      name:'home',
      component: () => import('./views/Home.vue')
    },
    {
      path:'/products/:id',
      name:'details',
      component: () => import('./views/Detailpage.vue')
    },
    {
      path:'/cart',
      name:'cart',
      component: () => import('./views/CartPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/mytransaction',
      name: 'transaction',
      component: () => import('./views/userTransaction.vue'),
      children:[
        {
          path:':id',
          name:'transactiondetail',
          component:() => import('@/components/DetailsTransaction.vue')
        }
      ]
    },
    {
      path:'/admin',
      name:'admin',
      component: () => import('@/views/Admin.vue'),
      children:[
        {
          path:'addProduct',
          name:'addProduct',
          component: () => import('@/components/FormProduct.vue')
        },
        {
          path:'transaction',
          name:'alltransaction',
          component: () => import('@/views/Transaction.vue')
        },
        {
          path:'overview',
          name:'overview',
          component: () => import('@/views/Overview.vue')
        },
        {
          path:'editProduct/:id',
          name:'editProduct',
          component: () => import('@/components/FormProduct.vue')
        }
      ]
    }
  ]
})
