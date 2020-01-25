import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue } from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import store from "./store";

Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(VueCookies)

Vue.$cookies.config('7d')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
