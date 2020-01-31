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
    path: '/userShop/:sellerId',
    name: 'userShopPage',
    component: () => import(/* webpackChunkName: "userShopPage" */ '../views/userShopPage.vue')
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
    path: '/product/:mode/:itemId',
    name: 'purchasePage',
    component: () => import(/* webpackChunkName: "purchasePage" */ '../views/productViewerPage.vue')
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
        path: '/dashboard/invoiceIncomplete',
        name: 'invoiceIncomplete',
        component: () => import(/* webpackChunkName: "invoiceIncomplete" */ '../views/dashboard/dashboardInvoiceIncomplete.vue')
      },
      {
        path: '/dashboard/invoiceComplete',
        name: 'invoiceComplete',
        component: () => import(/* webpackChunkName: "invoiceComplete" */ '../views/dashboard/dashboardInvoiceComplete.vue')
      },
      {
        path: '/dashboard/POOngoing',
        name: 'POOngoing',
        component: () => import(/* webpackChunkName: "POOngoing" */ '../views/dashboard/dashboardPOOngoing.vue')
      },
      {
        path: '/dashboard/POComplete',
        name: 'POComplete',
        component: () => import(/* webpackChunkName: "POOngoing" */ '../views/dashboard/dashboardPOComplete.vue')
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
