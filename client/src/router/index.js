import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: () => import(/* webpackChunkName: "HomePage" */ '../views/HomePage.vue')
  },
  {
    path: '/user/:page',
    name: 'registrationLoginPage',
    component: () => import(/* webpackChunkName: "userRegistrationLogin" */ '../views/RegistrationLoginPage.vue')
  },
  {
    path: '/myShop',
    name: 'myShopPage',
    component: () => import(/* webpackChunkName: "myShopPage" */ '../views/myShopPage.vue')
  },
  {
    path: '/myCarts',
    name: 'myCartsPage',
    component: () => import(/* webpackChunkName: "myCartsPage" */ '../views/myCartsPage.vue')
  },
  {
    path: '/searchResult',
    name: 'searchResultPage',
    component: () => import(/* webpackChunkName: "searchResultPage" */ '../views/searchResultPage.vue')
  },
  {
    path: '/product/:mode',
    name: 'createEditItemPage',
    component: () => import(/* webpackChunkName: "createEditItemPage" */ '../views/createEditItemPage.vue')
  },
  {
    path: '/userprofile',
    name: 'userProfilePage',
    component: () => import(/* webpackChunkName: "userProfilePage" */ '../views/userProfilePage.vue')
  },
  {
    path: '/dashboard',
    name: 'dashBoardPage',
    component: () => import(/* webpackChunkName: "dashboardPage" */ '../views/dashboard/dashboard.vue'),
    children:[
      {
        path: '/dashboard/incompleteInvoice',
        name: 'incompleteInvoice',
        component: () => import(/* webpackChunkName: "incompleteInvoice" */ '../views/dashboard/dashboardIncompleteInvoice.vue')
      },
      {
        path: '/dashboard/transactionHistory',
        name: 'transactionHistory',
        component: () => import(/* webpackChunkName: "incompleteInvoice" */ '../views/dashboard/dashboardTxHistory.vue')
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
