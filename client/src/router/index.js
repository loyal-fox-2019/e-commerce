import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Detail from '../views/Detail.vue';
// import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/shopping',
    name: 'shoping',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "shopping" */ '../views/Shopping.vue'),
    children: [
      {
        path: ':id',
        component: Detail,
      },
    ],
    // beforeEnter(to, from, next) {
    //   if (store.state.isLogin) {
    //     next();
    //   } else {
    //     next({
    //       name: 'home',
    //     });
    //   }
    // },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
