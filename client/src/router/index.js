import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPage.vue'),
  },
  {
    path: '/myproducts',
    name: 'MyProductsPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyProductsPage.vue'),
  },
  {
    path: '/add-product',
    name: 'AddProductPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddProductPage.vue'),
  },
  {
    path: '/product/:id',
    name: 'ProductDetailPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductDetailPage.vue'),
  },
  {
    path: '/editproduct/:id',
    name: 'EditProductPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProductPage.vue'),
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/CartPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
