import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('token')) {
                next('/login')
            } else {
                next()
            }
        }
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: () => import(/* webpackChunkName: "cart" */ '../views/Transactions.vue'),
        children: [
            {
                path:'purchasing',
                name: 'purchasing',
                component: () => import(/* webpackChunkName: "purchasing" */ '../views/Purchasing'),
            },
            {
                path:'sells',
                name: 'sells',
                component: () => import(/* webpackChunkName: "sells" */ '../views/Sells'),
            }
        ],
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem('token')) {
                next('/login')
            } else {
                next()
            }
        },
    }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
