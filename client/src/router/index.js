import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
// Home
import Home from '../views/home/Index.vue';
import HomePage from '../views/home/HomePage.vue';
import DetailProduct from '../views/home/DetailProduct.vue';
// Admin
import Admin from '../views/admin/Index.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Product from '../views/admin/ProductPage.vue';
// Client

Vue.use(VueRouter);

const routes = [
  {
    path: '/clientarea',
    name: 'clientarea',
    component: () => import(/* webpackChunkName: "clientarea" */ '../views/client/Index.vue'),
    meta: {
      isLoggedIn: true,
      isAdmin: false,
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "cartPage" */ '../views/client/CartPage.vue'),
        meta: {
          isLoggedIn: true,
          isAdmin: false,
        },
      },
      {
        path: 'transactions',
        component: () => import(/* webpackChunkName: "cartPage" */ '../views/client/TransPage.vue'),
        meta: {
          isLoggedIn: true,
          isAdmin: false,
        },
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      isLoggedIn: true,
      isAdmin: true,
    },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: Dashboard,
        meta: {
          isLoggedIn: true,
          isAdmin: true,
        },
      },
      {
        path: 'products',
        name: 'admin-product',
        component: Product,
        meta: {
          isLoggedIn: true,
          isAdmin: true,
        },
      },
      {
        path: 'transactions',
        component: () => import(/* webpackChunkName: "TransPageAdmin" */ '../views/admin/TransPageAdmin.vue'),
        meta: {
          isLoggedIn: true,
          isAdmin: false,
        },
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      isLoggedIn: false,
    },
    children: [
      {
        path: '',
        component: HomePage,
        meta: {
          isLoggedIn: false,
        },
      },
      {
        path: ':id',
        name: 'detail-product',
        component: DetailProduct,
        meta: {
          isLoggedIn: false,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    const { token, isLogin } = store.state;
    if (route.meta.isLoggedIn && route.meta.isAdmin && isLogin.role === 'Admin') {
      next();
      return true;
    }
    if (route.meta.isLoggedIn && !route.meta.isAdmin && isLogin.role !== 'Admin') {
      if (token) {
        next();
        return true;
      }
      next({ path: '/' });
      return true;
    }
    next();
    return true;
  });
  next();
});
export default router;
