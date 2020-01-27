import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Portofolio from '../views/Portofolio.vue';
import Wheels from '../views/Wheels.vue';
import detailWheel from '@/components/DetailWheel.vue';
import Cart from '../views/Cart.vue';
import addWheels from '../views/AddWheels.vue';
import listProduct from '../views/ListProduct.vue';
import editProduct from '../views/EditProduct.vue';
import addPortofolio from '../views/AddPortofolio.vue';

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
    component: Login,
  },
  {
    path: '/register',
    name: 'register', 
    component: Register,
  },
  {
    path: '/portofolio',
    name: 'portofolio',
    component: Portofolio,
  },
  {
    path: '/wheels',
    name: 'wheels',
    component: Wheels,
    children: [
      {
        path: ':wheel_id',
        name: 'detailWheel',
        component: detailWheel
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/new-wheels',
    name: 'new-wheels',
    component: addWheels,
  },
  {
    path: '/list-product',
    name: 'list-product',
    component: listProduct
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: editProduct
  },
  {
    path: '/add-portofolio',
    name: 'add-portofolio',
    component: addPortofolio
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
