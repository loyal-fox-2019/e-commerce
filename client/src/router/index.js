import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Account from '../views/Account.vue';
import Cart from '../views/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    beforeEach: (to, from, next) => {
      if (!isAuthenticated) next('/account')
      else next()
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});



export default router;
