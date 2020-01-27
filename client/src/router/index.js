import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import Register from '../views/Register.vue';
import Item from '../views/Item.vue';
import PageNotFound from '../views/PageNotFound.vue';
import Profile from '../views/Profile.vue';
import Cart from '../views/Cart.vue';
import AddNewItem from '../views/AddNewItem.vue';

Vue.use(VueRouter);

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
    path: '/user',
    name: 'user',
    component: Profile,
    children: [
      {
        path: 'signin',
        component: SignIn
      },
      {
        path: 'register',
        component: Register
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/items/:id',
    name: 'item',
    component: Item
  },
  {
    path: '/add-new-item',
    name: 'addNewItem',
    component: AddNewItem
  },
  {
    path: '/page-not-found',
    name: 'not-found',
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
