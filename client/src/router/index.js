import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyProduct from '../views/MyProduct.vue'
import LoginPage from '../views/LoginReg.vue'
import DetailProduct from "../views/DetailProduct.vue"
import addProduct from "../views/addProduct.vue"
import myCarts from "../views/myCart.vue"
import history from "../components/history.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/myProducts",
    name: "myproducts",
    component: MyProduct
  },
  {
    path: "/login",
    name: "loginPage",
    component: LoginPage
  },
  {
    path: "/detail/:id",
    name: "detaiProduct",
    component: DetailProduct
  },
  {
    path: "/addProduct",
    name: "addProduct",
    component: addProduct
  },
  {
    path: "/myCarts",
    name: "myCarts",
    component: myCarts,
    children: [{
      name: "history",
      path: "history",
      component: history
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
