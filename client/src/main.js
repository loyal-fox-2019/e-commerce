import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification'
import money from 'v-money'

import 'vue-toast-notification/dist/index.css'
import './assets/output.css'

Vue.config.productionTip = false

Vue.use(VueToast)
Vue.use(money, { precision: 2 })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
