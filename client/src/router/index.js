import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/Register.vue"),
    beforeEnter: (to, from, next) => {
      if (to.path === "register") {
        next({ name: "register email" });
      } else {
        next();
      }
    },
    children: [
      {
        path: "",
        redirect: { name: "register email" }
      },
      {
        path: "email",
        name: "register email",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "@/components/RegisterEmail.vue"
          )
      },
      {
        path: "detail",
        name: "register detail",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "@/components/RegisterDetail.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
