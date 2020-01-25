import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GSignInButton from 'vue-google-signin-button'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '199854943337-895pidlcap8v66cslv8vm2u4net4nnm4.apps.googleusercontent.com'
}

Vue.config.productionTip = false
Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(GSignInButton)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
