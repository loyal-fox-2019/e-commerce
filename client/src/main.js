import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import SuiVue from 'semantic-ui-vue';
import axios from './config/axiosSet'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(SuiVue);
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)

import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'semantic-ui-css/semantic.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
