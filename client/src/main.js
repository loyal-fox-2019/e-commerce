import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import fontAwsome from './assets/css/all.css';
import VAnimateCss from 'v-animate-css';

Vue.use(VAnimateCss);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(fontAwsome);

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
