import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faStore, faHistory, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'


let socketPath = ''
if(process.env.NODE_ENV === 'development')
{
  socketPath = 'http://localhost:3000'
}
if(process.env.NODE_ENV === 'production')
{
  socketPath = 'http://ecommerce-server.japhendywijaya.xyz:3000'
}



// const options = { path: '/my-app/' }; //Options object to pass into SocketIO
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(socketPath), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);



library.add( faShoppingCart, faStore, faHistory, faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
