import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path: '/my-cart',
    name: 'myCart',
    component: () => import(/* webpackChunkName: "myCart" */ '../views/MyCart.vue'),
  },
  {
    path: '/purchase',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    children: [
      {
        path: '',
        name: 'purchaseGold',
        component: () => import(/* webpackChunkName: "barsGold" */ '../components/Product.vue'),
      },
      {
        path: 'series',
        name: 'purchaseSeries',
        component: () => import(/* webpackChunkName: "seriesGold" */ '../components/Product.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
