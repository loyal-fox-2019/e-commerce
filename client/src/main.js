import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import vueDebounce from 'vue-debounce';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  defaultTime: '700ms',
});
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
