import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue} from 'bootstrap-vue'
import axios from 'axios'
import dotenv from 'dotenv'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

dotenv.config()
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
