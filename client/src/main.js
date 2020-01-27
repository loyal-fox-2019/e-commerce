import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueSwal from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

Vue.use(vueSwal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
