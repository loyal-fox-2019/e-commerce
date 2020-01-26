import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';
import Home from '../views/home/Index.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Product from '../views/admin/ProductPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      isLoggedIn: true,
      isAdmin: true,
    },
  },
  {
    path: '/products',
    name: 'product',
    component: Product,
    meta: {
      isLoggedIn: true,
      isAdmin: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   to.matched.some((route) => {
//     const { token, isLogin } = store.state;
//     if (route.meta.isLoggedIn && route.meta.isAdmin) {
//       if (isLogin.role === 'Admin') {
//         next();
//       }
//     }
//     if (route.meta.isLoggedIn) {
//       if (token) {
//         next();
//       } else {
//         next({ path: '/' });
//       }
//     }
//   });
//   next();
// });
export default router;
