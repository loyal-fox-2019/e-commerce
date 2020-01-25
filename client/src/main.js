import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/index.css'

Vue.config.productionTip = false
// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)

import './assets/output.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(VueToast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
